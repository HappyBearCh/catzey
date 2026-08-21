import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { titleValue, getGroup } from '@/lib/number-groups';

export const maxDuration = 60;
export const runtime = 'nodejs';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

/** Which shelf this week's selection leaned on, counted after the fact. */
function weekLine(articles: { title: string }[]): string {
  if (articles.length === 0) return '';
  const byShelf = new Map<number, number>();
  for (const a of articles) {
    const n = titleValue(a.title);
    byShelf.set(n, (byShelf.get(n) ?? 0) + 1);
  }
  const [n, count] = [...byShelf.entries()].sort((a, b) => b[1] - a[1])[0];
  const group = getGroup(n);
  return `${count} of this week's ${articles.length} reduce to ${n} &mdash; ${group.shelf}, ${group.tagline}.`;
}

function buildEmailHtml(articles: { title: string; excerpt: string; slug: string; imageUrl: string | null; category: string }[]): string {
  const items = articles
    .map(
      (a) => `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
        ${a.imageUrl ? `<img src="${a.imageUrl}" alt="" width="120" height="80" style="float:left;margin-right:16px;object-fit:cover;border-radius:2px;" />` : ''}
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#d0342c;">${a.category} &middot; ${titleValue(a.title)} ${getGroup(titleValue(a.title)).shelf}</p>
        <p style="margin:0 0 6px;font-size:16px;font-weight:800;line-height:1.3;color:#0c0c0c;">
          <a href="${BASE}/article/${a.slug}" style="color:#0c0c0c;text-decoration:none;">${a.title}</a>
        </p>
        <p style="margin:0;font-size:14px;color:#555;line-height:1.5;">${a.excerpt}</p>
        <div style="clear:both;"></div>
      </td>
    </tr>`,
    )
    .join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:4px;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:#14110f;padding:20px 32px;border-top:4px solid #d0342c;">
            <span style="font-size:24px;font-weight:900;letter-spacing:-.02em;color:#f7f4ee;">Catzye</span>
            <p style="margin:4px 0 0;color:#9c968c;font-size:12px;">A week, read by its numbers</p>
          </td>
        </tr>
        <!-- What the week reduced to. A count made afterwards, not a claim
             that anything was chosen by number. -->
        <tr>
          <td style="padding:16px 32px 0;">
            <p style="margin:0;font-size:12px;color:#6f675e;line-height:1.6;">${weekLine(articles)}</p>
          </td>
        </tr>
        <!-- Articles -->
        <tr>
          <td style="padding:0 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${items}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              <a href="${BASE}" style="color:#d0342c;text-decoration:none;">Catzye</a> — manga, filed by number
              · <a href="${BASE}/numbers" style="color:#9ca3af;">The shelves</a>
              · <a href="${BASE}/feed.xml" style="color:#9ca3af;">RSS</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.DIGEST_FROM_EMAIL ?? 'newsletter@catzye.com';

  if (!resendKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 });
  }

  const [subscribers, topArticles] = await Promise.all([
    prisma.subscriber.findMany({ select: { email: true, token: true } }),
    prisma.article.findMany({
      where: {
        published: true,
        publishedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
      orderBy: { views: 'desc' },
      take: 6,
      select: { title: true, excerpt: true, slug: true, imageUrl: true, category: true },
    }),
  ]);

  if (subscribers.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, reason: 'no subscribers' });
  }

  if (topArticles.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, reason: 'no articles this week' });
  }

  const html = buildEmailHtml(topArticles);
  let sent = 0;
  let errors = 0;

  for (const sub of subscribers) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Catzye <${fromEmail}>`,
          to: sub.email,
          subject: `Catzye Weekly: Top Manga & Anime Stories`,
          html: html + `<p style="font-size:11px;color:#ccc;text-align:center;padding:8px 32px;">
            <a href="${BASE}/api/unsubscribe?token=${sub.token}" style="color:#ccc;">Unsubscribe</a>
          </p>`,
        }),
      });
      if (res.ok) sent++;
      else errors++;
    } catch {
      errors++;
    }
  }

  console.log(`[cron/digest] Sent ${sent}/${subscribers.length} emails, ${errors} errors`);
  return NextResponse.json({ ok: true, sent, errors });
}

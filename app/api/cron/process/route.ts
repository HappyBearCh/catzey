import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { processScrapeItemToArticle, mirrorImageToBlob } from '@/lib/scraper';
import { revalidatePath } from 'next/cache';
import { CATEGORIES } from '@/lib/types';
import { notifyPublished } from '@/lib/instant-index';

export const maxDuration = 300;
export const runtime = 'nodejs';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

// Publishing is paced by a rolling-24h ceiling rather than by how fast the
// queue fills: the feeds were averaging ~112 articles a day, which is a seventh
// of that. The cron still runs hourly so the ceiling is spread across the day.
const DAILY_PUBLISH_LIMIT = 16;
// Upper bound on what one run claims. Below the hourly share of the daily limit
// there would be no slack to absorb an item that fails, above it a single run
// would eat several hours' worth of the budget at once.
const BATCH_SIZE = 2;
// Stop claiming new work with enough runway left to finish the item in flight
// and release the rest. Keeps a slow batch from being killed mid-write.
const DEADLINE_MS = 240_000;
// A failed item is retried on later runs until it has burned this many attempts.
const MAX_RETRIES = 3;
// An item claimed longer ago than this belongs to a run that died; take it back.
const STUCK_AFTER_MS = 30 * 60 * 1000;
// At the throttled rate the feeds queue far more than gets published, so a
// pending item this old has been overtaken by the news and is retired unread.
const STALE_AFTER_MS = 3 * 24 * 60 * 60 * 1000;

function revalidateSite() {
  revalidatePath('/');
  for (const { slug } of CATEGORIES) revalidatePath(`/${slug}`);
}

async function pingSitemaps() {
  const encoded = encodeURIComponent(`${BASE}/sitemap.xml`);
  await Promise.allSettled([
    fetch(`https://www.google.com/ping?sitemap=${encoded}`),
    fetch(`https://www.bing.com/ping?sitemap=${encoded}`),
  ]);
}

// Fresh items go first — news value decays, and the queue now takes in more
// than the daily limit lets out, so newest-first is what keeps the site on
// today's headlines instead of working through a backlog. Retries only fill the
// slots left over, so a large error backlog can never crowd them out either.
async function claimBatch(limit: number) {
  const pending = await prisma.scrapedItem.findMany({
    where: { status: 'pending' },
    orderBy: { scrapedAt: 'desc' },
    take: limit,
  });
  if (pending.length >= limit) return pending;

  const retryable = await prisma.scrapedItem.findMany({
    where: { status: 'error', retries: { lt: MAX_RETRIES } },
    orderBy: [{ retries: 'asc' }, { scrapedAt: 'desc' }],
    take: limit - pending.length,
  });
  return [...pending, ...retryable];
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const startedAt = Date.now();

  // Reclaim anything stranded by an earlier run before picking new work. Rows
  // predating the claimedAt column carry NULL and are reclaimed on sight.
  const reclaimed = await prisma.scrapedItem.updateMany({
    where: {
      status: 'processing',
      OR: [{ claimedAt: null }, { claimedAt: { lt: new Date(startedAt - STUCK_AFTER_MS) } }],
    },
    data: { status: 'pending', claimedAt: null },
  });
  if (reclaimed.count > 0) {
    console.log(`[cron/process] Reclaimed ${reclaimed.count} stranded item(s)`);
  }

  // Retire pending items the throttled pipeline will never reach. The rows stay
  // so the scraper keeps deduping against them and never re-queues the same URL.
  const expired = await prisma.scrapedItem.updateMany({
    where: { status: 'pending', scrapedAt: { lt: new Date(startedAt - STALE_AFTER_MS) } },
    data: { status: 'stale' },
  });
  if (expired.count > 0) {
    console.log(`[cron/process] Retired ${expired.count} stale item(s)`);
  }

  // A rolling window rather than a calendar day: it needs no reset, and it caps
  // any 24 hours rather than letting a run at 23:00 spend two days' budget.
  const publishedToday = await prisma.article.count({
    where: { published: true, publishedAt: { gte: new Date(startedAt - 24 * 60 * 60 * 1000) } },
  });
  const budget = Math.min(BATCH_SIZE, DAILY_PUBLISH_LIMIT - publishedToday);
  if (budget <= 0) {
    return NextResponse.json({
      ok: true,
      processed: 0,
      publishedToday,
      reason: `daily limit of ${DAILY_PUBLISH_LIMIT} reached`,
    });
  }

  const items = await claimBatch(budget);

  if (items.length === 0) {
    return NextResponse.json({ ok: true, processed: 0, reason: 'queue empty' });
  }

  // Claim items to prevent concurrent cron overlap
  await prisma.scrapedItem.updateMany({
    where: { id: { in: items.map((i) => i.id) } },
    data: { status: 'processing', claimedAt: new Date() },
  });

  let published = 0;
  let skipped = 0;
  const publishedSlugs: string[] = [];
  const errors: string[] = [];

  for (const [index, item] of items.entries()) {
    // Out of runway: hand the rest back so the next run picks them up rather
    // than letting the function be killed with items still marked processing.
    if (Date.now() - startedAt > DEADLINE_MS) {
      const rest = items.slice(index).map((i) => i.id);
      await prisma.scrapedItem.updateMany({
        where: { id: { in: rest } },
        data: { status: 'pending', claimedAt: null },
      });
      skipped = rest.length;
      console.log(`[cron/process] Deadline reached, released ${skipped} item(s)`);
      break;
    }

    try {
      const result = await processScrapeItemToArticle({
        title: item.title,
        description: item.description,
        sourceUrl: item.sourceUrl,
        source: item.source,
        category: item.category,
        pubDate: item.pubDate,
      });

      if (!result.success) {
        await prisma.scrapedItem.update({
          where: { id: item.id },
          data: { status: 'error', retries: { increment: 1 }, claimedAt: null },
        });
        errors.push(`${item.title.slice(0, 60)}: ${result.error}`);
        continue;
      }

      // Mirror RSS image to Vercel Blob, fall back to search candidate
      let imageUrl: string | null = item.imageUrl ?? result.images[0]?.url ?? null;
      if (imageUrl) {
        const blobUrl = await mirrorImageToBlob(imageUrl).catch(() => null);
        if (blobUrl) imageUrl = blobUrl;
      }

      const pub = await prisma.article.update({
        where: { id: result.articleId },
        data: {
          published: true,
          publishedAt: new Date(),
          ...(imageUrl && { imageUrl }),
        },
        select: { slug: true },
      });

      await prisma.scrapedItem.update({
        where: { id: item.id },
        data: { status: 'done', claimedAt: null },
      });
      published++;
      publishedSlugs.push(pub.slug);
      console.log(`[cron/process] Published: "${item.title.slice(0, 60)}"`);
    } catch (err) {
      await prisma.scrapedItem
        .update({
          where: { id: item.id },
          data: { status: 'error', retries: { increment: 1 }, claimedAt: null },
        })
        .catch(() => {});
      errors.push(`${item.title.slice(0, 60)}: ${String(err)}`);
    }
  }

  if (published > 0) {
    revalidateSite();
    await Promise.allSettled([notifyPublished(publishedSlugs), pingSitemaps()]);
  }

  return NextResponse.json({
    ok: true,
    processed: items.length - skipped,
    published,
    publishedToday: publishedToday + published,
    dailyLimit: DAILY_PUBLISH_LIMIT,
    reclaimed: reclaimed.count || undefined,
    retired: expired.count || undefined,
    skipped: skipped || undefined,
    errors: errors.length > 0 ? errors : undefined,
  });
}

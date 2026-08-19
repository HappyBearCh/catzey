import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const revalidate = 3600;

export async function GET() {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

  // A DB blip must not surface to Google News as a 500 — repeated fetch errors
  // on the news sitemap get the source demoted. An empty (but well-formed)
  // urlset is retried harmlessly on the next crawl.
  let articles: { slug: string; title: string; publishedAt: Date; imageUrl: string | null }[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { published: true, publishedAt: { gte: twoDaysAgo } },
      orderBy: { publishedAt: 'desc' },
      // Google News caps the news sitemap at 1000 URLs.
      take: 1000,
      select: { slug: true, title: true, publishedAt: true, imageUrl: true },
    });
  } catch {
    articles = [];
  }

  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const items = articles.map((a) => `
  <url>
    <loc>${BASE}/article/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Catzye</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(a.publishedAt).toISOString()}</news:publication_date>
      <news:title>${esc(a.title)}</news:title>
    </news:news>${a.imageUrl ? `
    <image:image>
      <image:loc>${esc(a.imageUrl.startsWith('http') ? a.imageUrl : `${BASE}${a.imageUrl}`)}</image:loc>
      <image:title>${esc(a.title)}</image:title>
    </image:image>` : ''}
  </url>`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${items.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // An empty result is either a genuinely quiet two days or a failed query;
      // either way it is not worth pinning for half an hour.
      'Cache-Control': articles.length
        ? 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600'
        : 'public, max-age=60, s-maxage=60',
    },
  });
}

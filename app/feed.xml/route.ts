import { prisma } from '@/lib/db';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET() {
  const articles = await prisma.article.findMany({
    where: { published: true, displayLang: { in: ['en', 'both'] } },
    orderBy: { publishedAt: 'desc' },
    take: 50,
    select: { title: true, slug: true, excerpt: true, category: true, publishedAt: true, imageUrl: true },
  });

  const items = articles.map((a) => `
  <item>
    <title>${esc(a.title)}</title>
    <link>${BASE}/article/${a.slug}</link>
    <description>${esc(a.excerpt)}</description>
    <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
    <guid isPermaLink="true">${BASE}/article/${a.slug}</guid>
    <category>${esc(a.category)}</category>
    ${a.imageUrl ? `<media:content url="${esc(a.imageUrl)}" medium="image"/>` : ''}
  </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Catzye — Manga &amp; Anime News</title>
    <link>${BASE}</link>
    <description>The latest manga and anime news, reviews, and industry updates.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

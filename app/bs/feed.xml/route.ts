import { prisma } from '@/lib/db';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET() {
  const articles = await prisma.article.findMany({
    where: { published: true, displayLang: { in: ['bs', 'both'] } },
    orderBy: { publishedAt: 'desc' },
    take: 50,
    select: { titleBs: true, title: true, slug: true, excerptBs: true, excerpt: true, category: true, publishedAt: true, imageUrl: true },
  });

  const items = articles.map((a) => {
    const title = a.titleBs || a.title;
    const excerpt = a.excerptBs || a.excerpt;
    return `
  <item>
    <title>${esc(title)}</title>
    <link>${BASE}/bs/article/${a.slug}</link>
    <description>${esc(excerpt)}</description>
    <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
    <guid isPermaLink="true">${BASE}/bs/article/${a.slug}</guid>
    <category>${esc(a.category)}</category>
    ${a.imageUrl ? `<media:content url="${esc(a.imageUrl)}" medium="image"/>` : ''}
  </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Catzye — Vijesti iz Bosne</title>
    <link>${BASE}/bs</link>
    <description>Vijesti iz Bosne na bosanskom jeziku.</description>
    <language>bs</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/bs/feed.xml" rel="self" type="application/rss+xml"/>
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

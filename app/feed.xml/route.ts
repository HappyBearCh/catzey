import { prisma } from '@/lib/db';

export const revalidate = 1800;
export const runtime = 'nodejs';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET() {
  let articles: {
    title: string; slug: string; excerpt: string; category: string;
    publishedAt: Date; imageUrl: string | null; tags: string[];
  }[] = [];

  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 50,
      select: { title: true, slug: true, excerpt: true, category: true, publishedAt: true, imageUrl: true, tags: true },
    });
  } catch {
    // DB unavailable
  }

  const items = articles.map((a) => {
    const url = `${BASE}/article/${a.slug}`;
    const tagCategories = [a.category, ...a.tags].map((t) => `<category>${esc(t)}</category>`).join('');
    return `
  <item>
    <title>${esc(a.title)}</title>
    <link>${url}</link>
    <description>${esc(a.excerpt)}</description>
    <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
    <guid isPermaLink="true">${url}</guid>
    ${tagCategories}
    ${a.imageUrl ? `<media:content url="${esc(a.imageUrl)}" medium="image"/>` : ''}
    ${a.imageUrl ? `<enclosure url="${esc(a.imageUrl)}" length="0" type="image/jpeg"/>` : ''}
  </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Catzye — Manga &amp; Anime News</title>
    <link>${BASE}</link>
    <description>The latest manga and anime news, reviews, and industry updates.</description>
    <language>en</language>
    <ttl>30</ttl>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
    },
  });
}

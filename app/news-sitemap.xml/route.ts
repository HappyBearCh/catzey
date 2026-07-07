import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const revalidate = 3600;

export async function GET() {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

  const articles = await prisma.article.findMany({
    where: { published: true, publishedAt: { gte: twoDaysAgo } },
    orderBy: { publishedAt: 'desc' },
    select: { slug: true, title: true, publishedAt: true, imageUrl: true },
  });

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
      <image:loc>${esc(a.imageUrl)}</image:loc>
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
      'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
    },
  });
}

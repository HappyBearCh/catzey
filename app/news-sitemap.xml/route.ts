import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const revalidate = 3600;

export async function GET() {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

  const articles = await prisma.article.findMany({
    where: { published: true, publishedAt: { gte: twoDaysAgo } },
    orderBy: { publishedAt: 'desc' },
    select: { slug: true, title: true, publishedAt: true, displayLang: true },
  });

  const items = articles.flatMap((a) => {
    const entries: string[] = [];
    if (a.displayLang !== 'bs') {
      entries.push(`
  <url>
    <loc>${BASE}/article/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Catzye</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(a.publishedAt).toISOString()}</news:publication_date>
      <news:title>${a.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
    </news:news>
  </url>`);
    }
    return entries;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

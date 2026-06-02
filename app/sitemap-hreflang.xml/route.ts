import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CATEGORIES } from '@/lib/types';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const revalidate = 3600;

export async function GET() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true, displayLang: true, updatedAt: true },
    orderBy: { publishedAt: 'desc' },
  });

  const staticUrls = [
    `  <url>
    <loc>${BASE}/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE}/"/>
    <xhtml:link rel="alternate" hreflang="bs" href="${BASE}/bs"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/"/>
  </url>`,
    ...CATEGORIES.flatMap(({ slug }) => [
      `  <url>
    <loc>${BASE}/${slug}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE}/${slug}"/>
    <xhtml:link rel="alternate" hreflang="bs" href="${BASE}/bs/${slug}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/${slug}"/>
  </url>`,
    ]),
  ];

  const articleUrls = articles
    .filter((a) => a.displayLang === 'both')
    .map((a) => `  <url>
    <loc>${BASE}/article/${a.slug}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE}/article/${a.slug}"/>
    <xhtml:link rel="alternate" hreflang="bs" href="${BASE}/bs/article/${a.slug}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/article/${a.slug}"/>
  </url>`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticUrls, ...articleUrls].join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

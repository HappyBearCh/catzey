import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';
import { CATEGORIES } from '@/lib/types';

export const revalidate = 3600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: { slug: string; updatedAt: Date; displayLang: string }[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, displayLang: true },
      orderBy: { publishedAt: 'desc' },
      take: 5000,
    });
  } catch {
    // DB unavailable — return static pages only
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'hourly' as const, priority: 1 },
    { url: `${BASE}/bs`, lastModified: new Date(), changeFrequency: 'hourly' as const, priority: 1 },
    ...CATEGORIES.flatMap(({ slug }) => [
      { url: `${BASE}/${slug}`, lastModified: new Date(), changeFrequency: 'hourly' as const, priority: 0.8 },
      { url: `${BASE}/bs/${slug}`, lastModified: new Date(), changeFrequency: 'hourly' as const, priority: 0.8 },
    ]),
  ];

  const articlePages: MetadataRoute.Sitemap = articles.flatMap((a) => {
    const entries: MetadataRoute.Sitemap = [];
    if (a.displayLang !== 'bs') {
      entries.push({ url: `${BASE}/article/${a.slug}`, lastModified: a.updatedAt, changeFrequency: 'weekly' as const, priority: 0.7 });
    }
    if (a.displayLang !== 'en') {
      entries.push({ url: `${BASE}/bs/article/${a.slug}`, lastModified: a.updatedAt, changeFrequency: 'weekly' as const, priority: 0.7 });
    }
    return entries;
  });

  return [...staticPages, ...articlePages];
}

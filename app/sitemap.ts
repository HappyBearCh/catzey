import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';
import { CATEGORIES } from '@/lib/types';
import { getAllGuides } from '@/lib/guides';
import { getAllStandaloneGuides } from '@/lib/standalone-guides';

export const revalidate = 3600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: { slug: string; updatedAt: Date; tags: string[] }[] = [];
  let topEntities: string[] = [];

  try {
    [articles] = await Promise.all([
      prisma.article.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true, tags: true },
        orderBy: { publishedAt: 'desc' },
        take: 5000,
      }),
    ]);

    const entityRows = await prisma.$queryRaw<{ entity: string }[]>`
      SELECT DISTINCT UNNEST(entities) as entity
      FROM "Article"
      WHERE published = true AND array_length(entities, 1) > 0
      LIMIT 500
    `;
    topEntities = entityRows.map((r) => r.entity).filter(Boolean);
  } catch {
    // DB unavailable — return static pages only
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'hourly' as const, priority: 1 },
    { url: `${BASE}/trending`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${BASE}/guides`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    ...CATEGORIES.map(({ slug }) => (
      { url: `${BASE}/${slug}`, lastModified: new Date(), changeFrequency: 'hourly' as const, priority: 0.8 }
    )),
  ];

  const guidePages: MetadataRoute.Sitemap = [
    ...getAllGuides().map((g) => ({
      url: `${BASE}/${g.slug}/guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...getAllStandaloneGuides().map((g) => ({
      url: `${BASE}/guides/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  ];

  const allTags = new Set<string>();
  for (const a of articles) {
    for (const tag of a.tags) allTags.add(tag);
  }
  const tagPages: MetadataRoute.Sitemap = Array.from(allTags).map((tag) => ({
    url: `${BASE}/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.5,
  }));

  const topicPages: MetadataRoute.Sitemap = topEntities.map((entity) => ({
    url: `${BASE}/topic/${encodeURIComponent(entity)}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.55,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/article/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...guidePages, ...tagPages, ...topicPages, ...articlePages];
}

import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';
import { CATEGORIES } from '@/lib/types';
import { getAllGuides } from '@/lib/guides';
import { getAllStandaloneGuides } from '@/lib/standalone-guides';
import { getAllGenres } from '@/lib/genre-info';
import { getAllSeasons } from '@/lib/seasons';
import { getAllAuthors } from '@/lib/authors';
import { CATEGORY_PAGE_SIZE } from '@/components/CategoryArchive';

export const revalidate = 3600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';
const MAX_PAGINATED_PAGES = 50;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: { slug: string; updatedAt: Date; tags: string[]; imageUrl: string | null }[] = [];
  let entityRows: { entity: string; last: Date }[] = [];
  let categoryStats: { category: string; count: number; last: Date | null }[] = [];
  let seriesList: { slug: string; updatedAt: Date }[] = [];

  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, tags: true, imageUrl: true },
      orderBy: { publishedAt: 'desc' },
      take: 5000,
    });

    // Only list topics that clear the same >=2 threshold the topic page uses to
    // decide indexability. Advertising thin, self-noindexed URLs in the sitemap
    // just burns crawl budget and depresses Google's quality impression of the
    // site ("Discovered - currently not indexed").
    entityRows = await prisma.$queryRaw<{ entity: string; last: Date }[]>`
      SELECT UNNEST(entities) as entity, MAX("updatedAt") as last
      FROM "Article"
      WHERE published = true
      GROUP BY 1
      HAVING COUNT(*) >= 2
      LIMIT 500
    `;

    const grouped = await prisma.article.groupBy({
      by: ['category'],
      where: { published: true },
      _count: { _all: true },
      _max: { updatedAt: true },
    });
    categoryStats = grouped.map((g) => ({
      category: g.category,
      count: g._count._all,
      last: g._max.updatedAt,
    }));

    seriesList = await prisma.series.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });
  } catch {
    // DB unavailable — return static pages only
  }

  const newestUpdate = articles[0]?.updatedAt;

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: newestUpdate, changeFrequency: 'hourly' as const, priority: 1 },
    { url: `${BASE}/trending`, lastModified: newestUpdate, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${BASE}/calendar`, lastModified: newestUpdate, changeFrequency: 'daily' as const, priority: 0.7 },
    { url: `${BASE}/guides`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/numerology`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/numerology/daily`, lastModified: newestUpdate, changeFrequency: 'daily' as const, priority: 0.6 },
    { url: `${BASE}/series`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE}/about`, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${BASE}/editorial-policy`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE}/privacy`, changeFrequency: 'yearly' as const, priority: 0.2 },
  ];

  const categoryPages: MetadataRoute.Sitemap = [];
  for (const { slug } of CATEGORIES) {
    const stats = categoryStats.find((s) => s.category === slug);
    categoryPages.push({
      url: `${BASE}/${slug}`,
      lastModified: stats?.last ?? undefined,
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    });
    const totalPages = Math.min(
      Math.ceil((stats?.count ?? 0) / CATEGORY_PAGE_SIZE),
      MAX_PAGINATED_PAGES,
    );
    for (let p = 2; p <= totalPages; p++) {
      categoryPages.push({
        url: `${BASE}/${slug}/page/${p}`,
        lastModified: stats?.last ?? undefined,
        changeFrequency: 'daily' as const,
        priority: 0.4,
      });
    }
  }

  const guidePages: MetadataRoute.Sitemap = [
    ...getAllGuides().map((g) => ({
      url: `${BASE}/${g.slug}/guide`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...getAllStandaloneGuides().map((g) => ({
      url: `${BASE}/guides/${g.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  ];

  const tagLastModified = new Map<string, Date>();
  const tagCount = new Map<string, number>();
  for (const a of articles) {
    for (const tag of a.tags) {
      const prev = tagLastModified.get(tag);
      if (!prev || a.updatedAt > prev) tagLastModified.set(tag, a.updatedAt);
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
    }
  }
  // Skip single-use tags: their pages self-noindex, so keep them out of the
  // sitemap to concentrate crawl budget on indexable URLs.
  const tagPages: MetadataRoute.Sitemap = Array.from(tagLastModified.entries())
    .filter(([tag]) => (tagCount.get(tag) ?? 0) >= 2)
    .map(([tag, last]) => ({
      url: `${BASE}/tag/${encodeURIComponent(tag)}`,
      lastModified: last,
      changeFrequency: 'daily' as const,
      priority: 0.5,
    }));

  const topicPages: MetadataRoute.Sitemap = entityRows
    .filter((r) => r.entity)
    .map((r) => ({
      url: `${BASE}/topic/${encodeURIComponent(r.entity)}`,
      lastModified: r.last,
      changeFrequency: 'daily' as const,
      priority: 0.55,
    }));

  // Declaring the lead image makes the article eligible for Google Images,
  // which is a meaningful discovery surface for manga/anime coverage. Only
  // absolute URLs are valid in a sitemap, so relative uploads get prefixed.
  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/article/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    ...(a.imageUrl && {
      images: [a.imageUrl.startsWith('http') ? a.imageUrl : `${BASE}${a.imageUrl}`],
    }),
  }));

  const seriesPages: MetadataRoute.Sitemap = seriesList.map((s) => ({
    url: `${BASE}/series/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  const genrePages: MetadataRoute.Sitemap = getAllGenres().map((g) => ({
    url: `${BASE}/genre/${g.slug}`,
    lastModified: newestUpdate,
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  const seasonPages: MetadataRoute.Sitemap = getAllSeasons().map((s) => ({
    url: `${BASE}/season/${s.slug}`,
    changeFrequency: s.status === 'current' ? ('weekly' as const) : ('monthly' as const),
    priority: s.status === 'current' ? 0.7 : 0.5,
  }));

  const authorPages: MetadataRoute.Sitemap = getAllAuthors().map((a) => ({
    url: `${BASE}/author/${a.slug}`,
    lastModified: newestUpdate,
    changeFrequency: 'daily' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...genrePages, ...seasonPages, ...guidePages, ...seriesPages, ...authorPages, ...tagPages, ...topicPages, ...articlePages];
}

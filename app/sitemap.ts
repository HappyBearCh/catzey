import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';
import { CATEGORIES } from '@/lib/types';
import { getAllGuides } from '@/lib/guides';
import { getAllStandaloneGuides } from '@/lib/standalone-guides';
import { getAllGenres } from '@/lib/genre-info';
import { getAllSeasons } from '@/lib/seasons';
import { getAllAuthors } from '@/lib/authors';
import { tagSlug } from '@/lib/tags';
import { getAllLearnTopics, getAllGlossaryTerms, getAllWorks, getAllCreators } from '@/lib/education';
import { CATEGORY_PAGE_SIZE } from '@/components/CategoryArchive';

export const revalidate = 3600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';
const MAX_PAGINATED_PAGES = 50;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: { slug: string; updatedAt: Date; tags: string[]; entities: string[]; imageUrl: string | null }[] = [];
  let entityRows: { entity: string; last: Date }[] = [];
  let categoryStats: { category: string; count: number; last: Date | null }[] = [];
  let seriesList: { slug: string; updatedAt: Date }[] = [];

  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, tags: true, entities: true, imageUrl: true },
      orderBy: { publishedAt: 'desc' },
      take: 5000,
    });

    // Only list topics that clear the same >=2 threshold the topic page uses to
    // decide indexability. Advertising thin, self-noindexed URLs in the sitemap
    // just burns crawl budget and depresses Google's quality impression of the
    // site ("Discovered - currently not indexed").
    //
    // Aggregated in JS from the rows already fetched rather than by a second
    // raw SQL pass. Raw queries bypass the snapshot fallback in lib/db.ts, so
    // the old SELECT ... UNNEST version threw whenever Postgres was unreachable
    // and took the rest of this block down with it. Counts over the 5000 rows
    // above rather than the whole table — the same set the sitemap can list.
    const entityAgg = new Map<string, { count: number; last: Date }>();
    for (const a of articles) {
      for (const entity of a.entities ?? []) {
        const prev = entityAgg.get(entity);
        if (!prev) entityAgg.set(entity, { count: 1, last: a.updatedAt });
        else {
          prev.count += 1;
          if (a.updatedAt > prev.last) prev.last = a.updatedAt;
        }
      }
    }
    entityRows = [...entityAgg.entries()]
      .filter(([, v]) => v.count >= 2)
      .slice(0, 500)
      .map(([entity, v]) => ({ entity, last: v.last }));

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

  // Educational content — the reference + guides layer, read from the checked-in
  // JSON rather than the database, so this costs no query.
  const eduPages: MetadataRoute.Sitemap = [
    ...getAllLearnTopics().map((t) => ({
      url: `${BASE}/learn/${t.slug}`,
      lastModified: new Date(t.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...getAllGlossaryTerms().map((t) => ({
      url: `${BASE}/glossary/${t.slug}`,
      lastModified: new Date(t.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...getAllWorks().map((w) => ({
      url: `${BASE}/wiki/series/${w.slug}`,
      lastModified: new Date(w.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...getAllCreators().map((c) => ({
      url: `${BASE}/wiki/creator/${c.slug}`,
      lastModified: new Date(c.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: newestUpdate, changeFrequency: 'hourly' as const, priority: 1 },
    { url: `${BASE}/learn`, lastModified: newestUpdate, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/glossary`, lastModified: newestUpdate, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${BASE}/wiki`, lastModified: newestUpdate, changeFrequency: 'weekly' as const, priority: 0.85 },
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

  // Keyed by slug, not by raw label: the label is a display string and several
  // spellings ("sci-fi" / "sci fi") share one archive. Grouping here also stops
  // the sitemap advertising the same page under two URLs.
  const tagStats = new Map<string, { last: Date; count: number }>();
  for (const a of articles) {
    for (const tag of a.tags) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      const cur = tagStats.get(slug);
      if (!cur) {
        tagStats.set(slug, { last: a.updatedAt, count: 1 });
      } else {
        cur.count++;
        if (a.updatedAt > cur.last) cur.last = a.updatedAt;
      }
    }
  }
  // Skip single-use tags: their pages self-noindex, so keep them out of the
  // sitemap to concentrate crawl budget on indexable URLs.
  const tagPages: MetadataRoute.Sitemap = Array.from(tagStats.entries())
    .filter(([, s]) => s.count >= 2)
    .map(([slug, s]) => ({
      url: `${BASE}/tag/${encodeURIComponent(slug)}`,
      lastModified: s.last,
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

  return [...staticPages, ...eduPages, ...categoryPages, ...genrePages, ...seasonPages, ...guidePages, ...seriesPages, ...authorPages, ...tagPages, ...topicPages, ...articlePages];
}

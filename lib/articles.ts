import { cache } from 'react';
import { prisma } from '@/lib/db';
import type { Article } from '@/lib/types';

// These fetchers exist so a route's gating layout and its page can ask the same
// question without paying for it twice. React's per-request cache dedupes the
// call, so the layout's "does this exist?" check is free once the page runs.
//
// The gating layouts are what make notFound() return an actual 404: a layout
// renders outside its segment's loading.tsx Suspense boundary, whereas a page
// renders inside it — and once that boundary has flushed the 200 shell, Next can
// no longer set a status and degrades the 404 into a soft one.

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  try {
    const article = await prisma.article.findUnique({ where: { slug, published: true } });
    return (article as Article) ?? null;
  } catch {
    return null;
  }
});

export const getTopicArticles = cache(async (entity: string): Promise<Article[]> => {
  try {
    return (await prisma.article.findMany({
      where: { published: true, entities: { has: entity } },
      orderBy: { publishedAt: 'desc' },
      take: 24,
    })) as Article[];
  } catch {
    return [];
  }
});

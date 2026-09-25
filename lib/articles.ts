import { cache } from 'react';
import { prisma } from '@/lib/db';
import type { Article } from '@/lib/types';
import { entityVariants } from '@/lib/entity-canon';

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

// How many published articles a category actually holds. Six of the declared
// ten hold none, and both the category page's robots block and the sitemap need
// to know that before they advertise the URL.
export const categoryCount = cache(async (category: string): Promise<number> => {
  try {
    return await prisma.article.count({ where: { published: true, category } });
  } catch {
    return 0;
  }
});

export const getTopicArticles = cache(async (entity: string): Promise<Article[]> => {
  try {
    // Matched across every spelling of the entity, not just the one in the URL,
    // so "Weekly Shonen Jump" and "Weekly Shōnen Jump" produce one complete hub
    // instead of two half-filled ones.
    const variants = await entityVariants(entity);
    return (await prisma.article.findMany({
      where: { published: true, entities: { hasSome: variants } },
      orderBy: { publishedAt: 'desc' },
      take: 24,
    })) as Article[];
  } catch {
    return [];
  }
});

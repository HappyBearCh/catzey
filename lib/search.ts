import { prisma } from '@/lib/db';
import { GROUP_NUMBERS, getGroup, parseGroupParam, titleValue } from '@/lib/number-groups';

/**
 * A query that names a shelf — "7", "the ledger", "ledger". Returns the number,
 * or null when the query is ordinary words.
 */
export function shelfQuery(q: string): number | null {
  const query = q.trim().toLowerCase();
  if (!query) return null;
  const direct = parseGroupParam(query);
  if (direct) return direct;
  return (
    GROUP_NUMBERS.find((n) => {
      const shelf = getGroup(n).shelf.toLowerCase();
      return shelf === query || shelf.replace(/^the /, '') === query;
    }) ?? null
  );
}

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  imageUrl: string | null;
  publishedAt: Date;
}

export async function searchArticles(q: string): Promise<SearchResult[]> {
  const query = q.trim().toLowerCase();
  if (query.length < 2) return [];
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        excerpt: true,
        slug: true,
        category: true,
        imageUrl: true,
        publishedAt: true,
      },
    });

    const terms = query.split(/\s+/).filter(Boolean);
    // When the query names a shelf, everything on it counts as a match even if
    // the words never appear — that is the whole point of asking for a number.
    const shelf = shelfQuery(query);

    return articles
      .map((a) => {
        const haystack = [a.title ?? '', a.excerpt ?? ''].join(' ').toLowerCase();
        const words = terms.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0);
        const onShelf = shelf !== null && titleValue(a.title ?? '') === shelf ? 2 : 0;
        return { a, score: words + onShelf };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map(({ a }) => a as unknown as SearchResult);
  } catch {
    return [];
  }
}

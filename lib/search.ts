import { prisma } from '@/lib/db';

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
    return articles
      .map((a) => {
        const haystack = [a.title ?? '', a.excerpt ?? ''].join(' ').toLowerCase();
        const score = terms.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0);
        return { a, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map(({ a }) => a as unknown as SearchResult);
  } catch {
    return [];
  }
}

import { prisma } from '@/lib/db';

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  imageUrl: string | null;
  publishedAt: Date;
  titleBs: string | null;
  excerptBs: string | null;
  displayLang: string;
}

export async function searchArticles(q: string, lang: 'en' | 'bs' = 'en'): Promise<SearchResult[]> {
  const query = q.trim().toLowerCase();
  if (query.length < 2) return [];
  try {
    const langFilter = lang === 'en'
      ? { displayLang: { not: 'bs' as const } }
      : { displayLang: { not: 'en' as const } };

    const articles = await prisma.article.findMany({
      where: { published: true, ...langFilter },
      select: {
        id: true,
        title: true,
        excerpt: true,
        slug: true,
        category: true,
        imageUrl: true,
        publishedAt: true,
        titleBs: true,
        excerptBs: true,
        displayLang: true,
      },
    });

    const terms = query.split(/\s+/).filter(Boolean);
    const scored = articles
      .map((a) => {
        const haystack = [
          a.title ?? '',
          a.excerpt ?? '',
          lang === 'bs' ? (a.titleBs ?? '') : '',
          lang === 'bs' ? (a.excerptBs ?? '') : '',
        ].join(' ').toLowerCase();
        const score = terms.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0);
        return { a, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map(({ a }) => a as unknown as SearchResult);

    return scored;
  } catch {
    return [];
  }
}

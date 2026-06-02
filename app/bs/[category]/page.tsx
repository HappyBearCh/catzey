import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { CATEGORIES, getCategoryLabelBs, bsArticle } from '@/lib/types';
import type { Article } from '@/lib/types';

export const revalidate = 1800;

const PAGE_SIZE = 12;

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = getCategoryLabelBs(category);
  return {
    title: `${label} — Vijesti`,
    description: `Najnovije vijesti o temi ${label} iz Bosne.`,
  };
}

export function generateStaticParams() {
  return CATEGORIES.map(({ slug }) => ({ category: slug }));
}

async function getCategoryArticles(category: string, page: number) {
  try {
    const skip = (page - 1) * PAGE_SIZE;
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where: { category, published: true, displayLang: { in: ['bs', 'both'] } },
        orderBy: { publishedAt: 'desc' },
        take: PAGE_SIZE,
        skip,
      }),
      prisma.article.count({
        where: { category, published: true, displayLang: { in: ['bs', 'both'] } },
      }),
    ]);
    return { articles: articles as Article[], total, pages: Math.ceil(total / PAGE_SIZE) };
  } catch {
    return { articles: [] as Article[], total: 0, pages: 0 };
  }
}

export default async function BosnianCategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? '1'));

  const validCategory = CATEGORIES.find((c) => c.slug === category);
  if (!validCategory) notFound();

  const { articles: rawArticles, pages } = await getCategoryArticles(category, page);
  const articles = rawArticles.map(bsArticle);
  const label = validCategory.labelBs;

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="block w-1 h-8 bg-primary" />
        <h1 className="text-3xl font-black uppercase tracking-tight">{label}</h1>
      </div>
      <p className="text-site-gray text-sm mb-8 ml-4">
        Najnovije vijesti: {label}
      </p>

      {articles.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-xl font-bold mb-2">Nema još članaka</p>
          <p className="text-sm">Skrejper će automatski popuniti ovu sekciju.</p>
        </div>
      ) : (
        <>
          {page === 1 && (
            <div className="mb-8">
              <ArticleCard article={articles[0]} size="hero" articleBasePath="/bs/article" />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(page === 1 ? articles.slice(1) : articles).map((article) => (
              <ArticleCard key={article.id} article={article} size="medium" articleBasePath="/bs/article" />
            ))}
          </div>

          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {page > 1 && (
                <Link
                  href={`/bs/${category}?page=${page - 1}`}
                  className="px-4 py-2 text-xs font-bold border border-site-border hover:border-primary hover:text-primary transition-colors"
                >
                  ← Prethodna
                </Link>
              )}
              {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
                const p = i + 1;
                return (
                  <Link
                    key={p}
                    href={`/bs/${category}?page=${p}`}
                    className={`w-9 h-9 flex items-center justify-center text-xs font-bold transition-colors ${
                      p === page
                        ? 'bg-primary text-white'
                        : 'border border-site-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {p}
                  </Link>
                );
              })}
              {page < pages && (
                <Link
                  href={`/bs/${category}?page=${page + 1}`}
                  className="px-4 py-2 text-xs font-bold border border-site-border hover:border-primary hover:text-primary transition-colors"
                >
                  Sljedeća →
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

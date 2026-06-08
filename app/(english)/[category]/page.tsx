import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { CategoryInfo } from '@/components/CategoryInfo';
import { CATEGORIES, getCategoryLabel } from '@/lib/types';
import type { Article } from '@/lib/types';

export const revalidate = 1800;

const PAGE_SIZE = 12;

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = getCategoryLabel(category);
  return {
    title: `${label} News`,
    description: `Latest ${label} news — manga, anime and more.`,
  };
}

export function generateStaticParams() {
  return CATEGORIES.map(({ slug }) => ({ category: slug }));
}

async function getCategoryArticles(category: string, page: number, sort: 'latest' | 'popular' = 'latest') {
  const orderBy = sort === 'popular' ? { views: 'desc' as const } : { publishedAt: 'desc' as const };
  try {
    const skip = (page - 1) * PAGE_SIZE;
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where: { category, published: true, displayLang: { in: ['en', 'both'] } },
        orderBy,
        take: PAGE_SIZE,
        skip,
      }),
      prisma.article.count({
        where: { category, published: true, displayLang: { in: ['en', 'both'] } },
      }),
    ]);
    return { articles: articles as Article[], total, pages: Math.ceil(total / PAGE_SIZE) };
  } catch {
    return { articles: [] as Article[], total: 0, pages: 0 };
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? '1'));
  const sort = (sp.sort === 'popular' ? 'popular' : 'latest') as 'latest' | 'popular';

  const validCategory = CATEGORIES.find((c) => c.slug === category);
  if (!validCategory) notFound();

  const { articles, total, pages } = await getCategoryArticles(category, page, sort);
  const label = validCategory.label;
  const sortParam = sort === 'popular' ? '&sort=popular' : '';

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>›</span>
        <span className="text-primary font-bold">{label}</span>
      </nav>
      <div className="flex items-center gap-3 mb-2">
        <span className="block w-1 h-8 bg-primary" />
        <h1 className="text-3xl font-black uppercase tracking-tight">{label}</h1>
      </div>
      <div className="flex items-center justify-between mb-6 ml-4 mr-0">
        <p className="text-site-gray text-sm">
          Latest {label} news — {total.toLocaleString()} article{total !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-1.5">
          <Link
            href={`/${category}?sort=latest`}
            className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 border transition-colors ${
              sort === 'latest'
                ? 'bg-primary text-white border-primary'
                : 'border-site-border text-gray-600 hover:border-primary hover:text-primary dark:border-gray-600 dark:text-gray-400'
            }`}
          >
            Latest
          </Link>
          <Link
            href={`/${category}?sort=popular`}
            className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 border transition-colors ${
              sort === 'popular'
                ? 'bg-primary text-white border-primary'
                : 'border-site-border text-gray-600 hover:border-primary hover:text-primary dark:border-gray-600 dark:text-gray-400'
            }`}
          >
            Most Read
          </Link>
        </div>
      </div>

      <CategoryInfo slug={category} />

      {articles.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-xl font-bold mb-2">No articles yet</p>
          <p className="text-sm">The hourly scraper will populate this section automatically.</p>
        </div>
      ) : (
        <>
          {page === 1 && (
            <div className="mb-8">
              <ArticleCard article={articles[0]} size="hero" />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(page === 1 ? articles.slice(1) : articles).map((article) => (
              <ArticleCard key={article.id} article={article} size="medium" />
            ))}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {page > 1 && (
                <Link
                  href={`/${category}?page=${page - 1}${sortParam}`}
                  className="px-4 py-2 text-xs font-bold border border-site-border hover:border-primary hover:text-primary transition-colors"
                >
                  ← Previous
                </Link>
              )}
              {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
                const p = i + 1;
                return (
                  <Link
                    key={p}
                    href={`/${category}?page=${p}${sortParam}`}
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
                  href={`/${category}?page=${page + 1}${sortParam}`}
                  className="px-4 py-2 text-xs font-bold border border-site-border hover:border-primary hover:text-primary transition-colors"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

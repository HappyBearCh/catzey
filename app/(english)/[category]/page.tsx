import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { CategoryInfo } from '@/components/CategoryInfo';
import { CATEGORIES, getCategoryLabel } from '@/lib/types';
import type { Article } from '@/lib/types';

export const revalidate = 1800;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';
const PAGE_SIZE = 12;

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  manga: 'Latest manga news — new releases, chapter updates, licensing announcements, and industry coverage.',
  anime: 'Latest anime news — season announcements, episode updates, streaming releases, and studio news.',
  industry: 'Manga and anime industry news — publisher deals, sales figures, licensing, and business coverage.',
  reviews: 'Manga and anime reviews — new titles, ongoing series, and classic recommendations.',
  'light-novels': 'Light novel news — new releases, anime adaptations, licensing, and isekai coverage.',
  manhwa: 'Manhwa and webtoon news — Korean comics, Solo Leveling, Tower of God, and platform updates.',
  events: 'Manga and anime events — Comiket, Anime Expo, Jump Festa, conventions, and fan gatherings.',
  creators: 'Manga and anime creator news — artist announcements, interviews, and industry profiles.',
  shonen: 'Shōnen manga news — One Piece, Jujutsu Kaisen, Demon Slayer, My Hero Academia updates.',
  seinen: 'Seinen manga news — Berserk, Vagabond, Dungeon Meshi, and mature title coverage.',
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { category } = await params;
  const { page: pageStr } = await searchParams;
  const label = getCategoryLabel(category);
  const page = Math.max(1, parseInt(pageStr ?? '1'));
  const description = CATEGORY_DESCRIPTIONS[category] ?? `Latest ${label} manga and anime news and updates.`;
  const canonicalUrl = page > 1
    ? `${BASE}/${category}?page=${page}`
    : `${BASE}/${category}`;
  const ogImage = `/og?title=${encodeURIComponent(label + ' News')}&category=${category}`;

  return {
    title: page > 1 ? `${label} News — Page ${page}` : `${label} News`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${label} News | Catzye`,
      description,
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${label} News | Catzye`,
      description,
      images: [ogImage],
    },
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
        where: { category, published: true },
        orderBy,
        take: PAGE_SIZE,
        skip,
      }),
      prisma.article.count({
        where: { category, published: true },
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

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: label, item: `${BASE}/${category}` },
    ],
  };

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${label} News`,
    url: `${BASE}/${category}`,
    numberOfItems: articles.length,
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: (page - 1) * PAGE_SIZE + i + 1,
      url: `${BASE}/article/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
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

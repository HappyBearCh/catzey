import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { CategoryInfo } from '@/components/CategoryInfo';
import { NumberReading } from '@/components/NumberReading';
import { getCategoryLabel } from '@/lib/types';
import type { Article } from '@/lib/types';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';
export const CATEGORY_PAGE_SIZE = 12;

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  manga: 'Essays on how manga work: the grammar of the page, what stories believe, and what changes when manga cross languages — long-form, in series.',
  anime: 'Essays on anime as an art of adaptation: what the screen adds to a manga, what it loses, and how audiences answer back.',
  industry: 'Essays on the business of manga: serialization, editors, reader surveys, licensing and the economics of the collected volume.',
  reviews: 'Manga and anime reviews — new titles, ongoing series, and classic recommendations.',
  'light-novels': 'Light novel news — new releases, anime adaptations, licensing, and isekai coverage.',
  manhwa: 'Manhwa and webtoon news — Korean comics, Solo Leveling, Tower of God, and platform updates.',
  events: 'Manga and anime events — Comiket, Anime Expo, Jump Festa, conventions, and fan gatherings.',
  creators: 'Manga and anime creator news — artist announcements, interviews, and industry profiles.',
  shonen: 'Shōnen manga news — One Piece, Jujutsu Kaisen, Demon Slayer, My Hero Academia updates.',
  seinen: 'Seinen manga news — Berserk, Vagabond, Dungeon Meshi, and mature title coverage.',
};

// Pagination lives in the path, not a query string. A page that reads
// searchParams is opted out of static rendering entirely.
//
// There used to be a "Most Read" sort beside this one. It ranked by a view
// counter that stopped moving when reads left Postgres, so it was ranking the
// edition by noise; its URLs redirect here in next.config.ts.
export function categoryPageHref(category: string, page: number): string {
  const base = `/${category}`;
  return page <= 1 ? base : `${base}/page/${page}`;
}

// Windowed page list: first, last, current ±2, with null marking ellipsis gaps
function pageWindow(current: number, total: number): (number | null)[] {
  const wanted = new Set<number>([1, total]);
  for (let p = current - 2; p <= current + 2; p++) {
    if (p >= 1 && p <= total) wanted.add(p);
  }
  const sorted = [...wanted].sort((a, b) => a - b);
  const out: (number | null)[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push(null);
    out.push(sorted[i]);
  }
  return out;
}

async function getCategoryArticles(category: string, page: number) {
  const orderBy = { publishedAt: 'desc' as const };
  try {
    const skip = (page - 1) * CATEGORY_PAGE_SIZE;
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where: { category, published: true },
        orderBy,
        take: CATEGORY_PAGE_SIZE,
        skip,
      }),
      prisma.article.count({
        where: { category, published: true },
      }),
    ]);
    return { articles: articles as Article[], total, pages: Math.ceil(total / CATEGORY_PAGE_SIZE) };
  } catch {
    return { articles: [] as Article[], total: 0, pages: 0 };
  }
}

export async function CategoryArchive({
  category,
  page,
}: {
  category: string;
  page: number;
}) {
  const { articles, total, pages } = await getCategoryArticles(category, page);
  const label = getCategoryLabel(category);

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
    name: label,
    url: `${BASE}${categoryPageHref(category, page)}`,
    numberOfItems: articles.length,
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: (page - 1) * CATEGORY_PAGE_SIZE + i + 1,
      url: `${BASE}/article/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <span className="text-primary font-bold">{label}</span>
        {page > 1 && (
          <>
            <span aria-hidden="true">›</span>
            <span>Page {page}</span>
          </>
        )}
      </nav>
      <div className="flex items-center gap-3 mb-2">
        <span className="block w-1 h-8 bg-primary" />
        <h1 className="text-3xl font-semibold uppercase tracking-tight">
          {label}
          {page > 1 && <span className="text-gray-500 dark:text-gray-400"> — Page {page}</span>}
        </h1>
      </div>
      <div className="flex items-center justify-between mb-6 ml-4 mr-0">
        <p className="text-site-gray text-sm">
          {label} — {total.toLocaleString('en-US')} text{total !== 1 ? 's' : ''}, newest first
        </p>
      </div>

      {page === 1 && (
        <NumberReading
          title={getCategoryLabel(category)}
          label="section"
          seed={category}
          className="mb-8"
        />
      )}
      {page === 1 && <CategoryInfo slug={category} />}

      {articles.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          <p className="text-xl font-bold mb-2">Nothing filed here yet</p>
          <p className="text-sm">The section notes above are the reference for now.</p>
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
            <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2 mt-10">
              {page > 1 && (
                <Link
                  href={categoryPageHref(category, page - 1)}
                  className="px-4 py-2 text-xs font-bold border border-site-border hover:border-primary hover:text-primary transition-colors"
                >
                  ← Previous
                </Link>
              )}
              {pageWindow(page, pages).map((p, i) =>
                p === null ? (
                  <span key={`gap-${i}`} className="w-9 h-9 flex items-center justify-center text-xs text-gray-500" aria-hidden="true">
                    …
                  </span>
                ) : (
                  <Link
                    key={p}
                    href={categoryPageHref(category, p)}
                    aria-current={p === page ? 'page' : undefined}
                    className={`w-9 h-9 flex items-center justify-center text-xs font-bold transition-colors ${
                      p === page
                        ? 'bg-primary text-white'
                        : 'border border-site-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {p}
                  </Link>
                ),
              )}
              {page < pages && (
                <Link
                  href={categoryPageHref(category, page + 1)}
                  className="px-4 py-2 text-xs font-bold border border-site-border hover:border-primary hover:text-primary transition-colors"
                >
                  Next →
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}

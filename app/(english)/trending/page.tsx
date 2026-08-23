import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import type { Article } from '@/lib/types';
import { titleValue, getGroup, GROUP_NUMBERS } from '@/lib/number-groups';
import { getTrendingArticles } from '@/lib/articles';

export const revalidate = 3600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export async function generateMetadata(): Promise<Metadata> {
  // Nothing ranked in the window means nothing to rank — the page still
  // renders its explanation, but it does not ask to be indexed as a ranking.
  const empty = (await getTrendingArticles()).length === 0;
  return {
  title: 'Trending — Most Read on Catzye',
  description:
    'The manga and anime coverage readers have returned to most over the past 30 days, ranked — reporting, explainers and reference entries alike.',
  alternates: { canonical: `${BASE}/trending` },
  openGraph: {
    siteName: 'Catzye',
    locale: 'en_US',
    type: 'website',
    title: 'Trending | Catzye',
    description: 'The manga and anime writing readers returned to most over the past 30 days.',
    url: `${BASE}/trending`,
    images: [{ url: `/og?title=Trending%20on%20Catzye`, width: 1200, height: 630 }],
  },
  ...(empty && { robots: { index: false, follow: true } }),
  };
}

export default async function TrendingPage() {
  const articles = await getTrendingArticles();

  // What the most-read stories have in common, numerologically. It is a count
  // rather than a claim: whichever shelf leads simply led this month.
  const byShelf = new Map<number, number>();
  for (const a of articles) byShelf.set(titleValue(a.title), (byShelf.get(titleValue(a.title)) ?? 0) + 1);
  const leading = [...byShelf.entries()].sort((a, b) => b[1] - a[1])[0];

  // An ItemList with no items describes nothing; emit it only when there is a
  // ranking to describe.
  const itemListLd = articles.length === 0 ? null : {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Trending on Catzye',
    url: `${BASE}/trending`,
    numberOfItems: articles.length,
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/article/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      {itemListLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      )}

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <span className="text-primary font-bold">Trending</span>
      </nav>

      <div className="flex items-center gap-3 mb-2">
        <span className="block w-1 h-8 bg-primary" />
        <h1 className="text-3xl font-semibold uppercase tracking-tight">Trending</h1>
      </div>
      <p className="text-site-gray text-sm mb-6 ml-4">
        Most-read on Catzye over the past 30 days
      </p>

      {leading && (
        <section className="border-y-2 border-ink dark:border-parchment py-4 mb-8" aria-label="What the month's reading reduces to">
          <p className="eyebrow mb-3">What the month reduced to</p>
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {GROUP_NUMBERS.map((n) => {
              const count = byShelf.get(n) ?? 0;
              return (
                <Link
                  key={n}
                  href={`/number/${n}`}
                  title={`${getGroup(n).shelf} — ${count} of these`}
                  className={`flex items-center gap-1.5 border px-2 py-1 text-xs transition-colors ${
                    count > 0
                      ? 'border-seal hover:bg-seal/10'
                      : 'border-rule/40 dark:border-rule opacity-40'
                  }`}
                >
                  <span className="font-display text-gold">{n}</span>
                  <span className="text-ink-muted dark:text-parchment/50">{count}</span>
                </Link>
              );
            })}
          </div>
          <p className="text-sm text-ink-2 dark:text-parchment/70 leading-relaxed">
            {leading[1]} of the {articles.length} most-read pieces reduce to {leading[0]} —{' '}
            <Link href={`/number/${leading[0]}`} className="text-gold hover:underline">
              {getGroup(leading[0]).shelf}
            </Link>
            , {getGroup(leading[0]).tagline}. Readers were not choosing by number and the reference
            makes no claim that they were; it only counted afterwards.
          </p>
        </section>
      )}

      {articles.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-xl font-bold mb-2">No trending articles yet</p>
          <p className="text-sm">Check back once articles have accumulated views.</p>
        </div>
      ) : (
        <>
          {/* Top article hero */}
          <div className="mb-8">
            <ArticleCard article={articles[0]} size="hero" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {articles.slice(1).map((article, i) => (
              <div key={article.id} className="relative">
                <span className="absolute top-2 left-2 z-10 bg-primary text-white text-2xs font-semibold w-6 h-6 flex items-center justify-center rounded-full">
                  {i + 2}
                </span>
                <ArticleCard article={article} size="medium" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

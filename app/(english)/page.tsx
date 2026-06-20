import { prisma } from '@/lib/db';
import { HeroSection } from '@/components/HeroSection';
import { ArticleCard } from '@/components/ArticleCard';
import { BreakingTicker } from '@/components/BreakingTicker';
import { TrendingStrip } from '@/components/TrendingStrip';
import { LoadMoreArticles } from '@/components/LoadMoreArticles';
import { MostRead } from '@/components/MostRead';
import { CATEGORIES } from '@/lib/types';
import { getAllStandaloneGuides } from '@/lib/standalone-guides';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { Article } from '@/lib/types';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Catzye — Manga & Anime News, Reviews & Industry Updates',
  description:
    'Breaking manga, anime, and manhwa news with chapter reviews, release calendars, season guides, and in-depth coverage — updated hourly.',
  alternates: { canonical: '/' },
  openGraph: { url: BASE },
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Catzye',
  url: BASE,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/search?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsMediaOrganization',
  name: 'Catzye',
  url: BASE,
  logo: { '@type': 'ImageObject', url: `${BASE}/logo.png`, width: 200, height: 60 },
  description: 'Manga and anime news, reviews, and industry coverage.',
  masthead: `${BASE}/about`,
  publishingPrinciples: `${BASE}/editorial-policy`,
  correctionsPolicy: `${BASE}/editorial-policy`,
  // Populate these env vars with your public profile URLs to strengthen
  // entity / Knowledge Graph signals (e.g. https://x.com/catzye).
  sameAs: [
    process.env.NEXT_PUBLIC_TWITTER_URL,
    process.env.NEXT_PUBLIC_BLUESKY_URL,
    process.env.NEXT_PUBLIC_REDDIT_URL,
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_YOUTUBE_URL,
  ].filter(Boolean) as string[],
};

export const revalidate = 1800; // Revalidate every 30 minutes

async function getArticles() {
  try {
    return await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 30,
    });
  } catch {
    return [] as Article[];
  }
}

export default async function HomePage() {
  const articles = await getArticles();

  if (articles.length === 0) {
    return (
      <div className="max-w-8xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-black mb-4 text-gray-800">Welcome to Catzye</h1>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          No articles yet. The scraper runs every hour pulling from manga &amp; anime news sites and will populate automatically.
          You can also trigger it manually:
        </p>
        <code className="block bg-gray-100 rounded px-4 py-2 text-sm text-gray-700 max-w-lg mx-auto">
          curl -H &quot;Authorization: Bearer $CRON_SECRET&quot; /api/cron/scrape
        </code>
        <p className="text-gray-400 text-sm mt-8">
          Make sure <code className="bg-gray-100 px-1 rounded">DATABASE_URL</code>,{' '}
          <code className="bg-gray-100 px-1 rounded">GEMINI_API_KEY</code>, and{' '}
          <code className="bg-gray-100 px-1 rounded">CRON_SECRET</code> are set in your
          environment.
        </p>
      </div>
    );
  }

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Latest Manga & Anime News',
    itemListElement: articles.slice(0, 10).map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/article/${a.slug}`,
      name: a.title,
    })),
  };

  const [featured, ...rest] = articles;
  const secondary = rest.slice(0, 3);
  const gridArticles = rest.slice(3, 9);
  const recentByCategory = CATEGORIES.map(({ label, slug }) => ({
    label,
    slug,
    articles: articles.filter((a) => a.category === slug).slice(0, 4),
  })).filter((c) => c.articles.length > 0);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      {/* Breaking news ticker */}
      <BreakingTicker articles={articles.slice(0, 5)} />
      <TrendingStrip />

      <div className="max-w-8xl mx-auto px-4">
        {/* Hero section */}
        <section className="my-4">
          <HeroSection featured={featured} secondary={secondary} />
        </section>

        {/* Top stories grid */}
        {gridArticles.length > 0 && (
          <section className="my-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-1 h-6 bg-primary" />
              <h2 className="text-lg font-black uppercase tracking-wide">Top Stories</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {gridArticles.map((article) => (
                <ArticleCard key={article.id} article={article} size="large" />
              ))}
            </div>
          </section>
        )}

        {/* Most read + guides */}
        <section className="my-8 border-t border-site-border pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <MostRead />
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-1 h-5 bg-primary" />
              <h2 className="text-sm font-black uppercase tracking-wider">Catzye Guides</h2>
            </div>
            <ul>
              {getAllStandaloneGuides().slice(0, 5).map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="group block py-3 border-b border-site-border last:border-0"
                  >
                    <p className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">
                      {guide.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                      {guide.subtitle} · {guide.readingTime} min read
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/guides"
              className="mt-4 block text-center text-xs font-bold uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors"
            >
              All Guides →
            </Link>
          </div>
        </section>

        {/* Category sections */}
        {recentByCategory.map(({ label, slug, articles: catArticles }) => (
          <section key={slug} className="my-8 border-t border-site-border pt-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="block w-1 h-6 bg-primary" />
                <h2 className="text-lg font-black uppercase tracking-wide">{label}</h2>
              </div>
              <Link
                href={`/${slug}`}
                className="text-sm font-bold uppercase tracking-wider text-primary hover:underline"
              >
                See All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {catArticles.map((article) => (
                <ArticleCard key={article.id} article={article} size="medium" />
              ))}
            </div>
          </section>
        ))}
        <LoadMoreArticles initialSkip={30} />
      </div>
    </>
  );
}

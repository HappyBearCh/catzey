import { prisma } from '@/lib/db';
import { HeroSection } from '@/components/HeroSection';
import { ArticleCard } from '@/components/ArticleCard';
import { BreakingTicker } from '@/components/BreakingTicker';
import { TrendingStrip } from '@/components/TrendingStrip';
import { LoadMoreArticles } from '@/components/LoadMoreArticles';
import { MostRead } from '@/components/MostRead';
import { TodaysNumber } from '@/components/TodaysNumber';
import { DAILY_CATEGORY } from '@/lib/daily-analysis';
import { CATEGORIES } from '@/lib/types';
import { getAllStandaloneGuides } from '@/lib/standalone-guides';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { Article } from '@/lib/types';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  // `absolute` so the root layout's "%s | Catzye" template does not append a
  // second "Catzye" to a title that already opens with the brand.
  title: { absolute: 'Catzye — Learn Manga: Guides, Glossary & Series Reference' },
  description:
    'Learn how manga works: explainers on genres, craft, history and the industry, a full glossary of manga terminology, and reference entries for the series and creators behind them.',
  alternates: { canonical: '/' },
  openGraph: { url: BASE },
};

const LEARN_ENTRY_POINTS = [
  {
    href: '/learn',
    title: 'Learn',
    blurb: 'Ordered explainers across basics, genres, craft, history and the industry.',
  },
  {
    href: '/glossary',
    title: 'Glossary',
    blurb: 'Every term you will run into, defined in a sentence and explained in full.',
  },
  {
    href: '/wiki',
    title: 'Wiki',
    blurb: 'Reference entries for the series themselves and the creators behind them.',
  },
];

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
  logo: { '@type': 'ImageObject', url: `${BASE}/icons/icon-512.png`, width: 512, height: 512 },
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

export const revalidate = 3600; // hourly; cron revalidatePath('/') covers new publishes

async function getArticles() {
  try {
    // The daily numerology column is surfaced via the Today's Number widget and
    // /numerology/daily — keep it out of the hero, grid, and category sections.
    return await prisma.article.findMany({
      where: { published: true, category: { not: DAILY_CATEGORY } },
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
        {/* The educational sections lead the page — they are what the site is
            for. The news archive stays below while it is still live. */}
        <section className="mt-6 mb-8">
          <div className="border border-site-border rounded-sm overflow-hidden">
            <div className="bg-site-dark px-5 py-6 md:px-8 md:py-8">
              <h2 className="text-white text-2xl md:text-3xl font-black tracking-tight mb-2">
                Learn how manga works
              </h2>
              <p className="text-gray-300 text-sm md:text-base max-w-2xl">
                Explainers, a full glossary, and reference entries for the series and
                creators behind them. Start from nothing, or look up the one thing you
                came for.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-site-border">
              {LEARN_ENTRY_POINTS.map(({ href, title, blurb }) => (
                <Link key={href} href={href} className="group p-5 hover:bg-primary/5 transition-colors">
                  <span className="block font-black text-lg mb-1 group-hover:text-primary transition-colors">
                    {title} <span aria-hidden="true">→</span>
                  </span>
                  <span className="block text-sm text-gray-600 dark:text-gray-300 leading-snug">{blurb}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Today's numerological read of the news */}
        <TodaysNumber articles={articles} />

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

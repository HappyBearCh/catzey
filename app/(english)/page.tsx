import { prisma } from '@/lib/db';
import { HeroSection } from '@/components/HeroSection';
import { ArticleCard } from '@/components/ArticleCard';
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

  // The archive is being retired, so an empty article table is an expected end
  // state, not a misconfiguration. Send readers to the reference rather than
  // showing them scraper instructions.
  if (articles.length === 0) {
    return (
      <div className="max-w-8xl mx-auto px-4 py-24 text-center">
        <p className="eyebrow mb-5">Manga, explained from the beginning</p>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl mx-auto text-ink dark:text-paper-2">
          A hand-written reference to how manga works
        </h1>
        <div className="rule-ornament max-w-md mx-auto mt-10 mb-8">
          <span className="text-seal text-sm" aria-hidden="true">✦</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-rule dark:bg-ink-border border border-rule dark:border-ink-border max-w-4xl mx-auto text-left">
          {LEARN_ENTRY_POINTS.map(({ href, title, blurb }, i) => (
            <Link
              key={href}
              href={href}
              className="group bg-paper dark:bg-ink-bg p-6 hover:bg-paper-2 dark:hover:bg-ink-bg-2 transition-colors"
            >
              <span className="eyebrow block mb-2">{String(i + 1).padStart(2, '0')}</span>
              <span className="block font-serif text-xl font-semibold mb-1.5 text-ink dark:text-paper-2 group-hover:text-seal transition-colors">
                {title}
              </span>
              <span className="block text-sm leading-relaxed text-ink-muted dark:text-paper-2/60">{blurb}</span>
            </Link>
          ))}
        </div>
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
      <div className="max-w-8xl mx-auto px-4">
        {/* The educational sections lead the page — they are what the site is
            for. The news archive stays below while it is still live. */}
        {/* A statement of what the site is, set as the opening of a book
            rather than as a promotional panel. */}
        <section className="py-10 md:py-16 text-center">
          <p className="eyebrow mb-5">Manga, explained from the beginning</p>
          <h1 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-3xl mx-auto text-ink dark:text-paper-2">
            A hand-written reference to how manga works,
            <span className="italic text-seal"> and where it came from</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-lg leading-relaxed text-ink-2 dark:text-paper-2/80">
            Explainers written to be read in order, a glossary of every term you will
            meet, and reference entries for the series and the people who drew them.
            No rankings, no release-day churn.
          </p>

          <div className="rule-ornament max-w-md mx-auto mt-10 mb-8">
            <span className="text-seal text-sm" aria-hidden="true">✦</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-rule dark:bg-ink-border border border-rule dark:border-ink-border max-w-4xl mx-auto text-left">
            {LEARN_ENTRY_POINTS.map(({ href, title, blurb }, i) => (
              <Link
                key={href}
                href={href}
                className="group bg-paper dark:bg-ink-bg p-6 hover:bg-paper-2 dark:hover:bg-ink-bg-2 transition-colors"
              >
                <span className="eyebrow block mb-2">{String(i + 1).padStart(2, '0')}</span>
                <span className="block font-serif text-xl font-semibold mb-1.5 text-ink dark:text-paper-2 group-hover:text-seal transition-colors">
                  {title}
                </span>
                <span className="block text-sm leading-relaxed text-ink-muted dark:text-paper-2/60">
                  {blurb}
                </span>
              </Link>
            ))}
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
            <div className="flex items-baseline gap-4 mb-6 pb-2 border-b border-rule dark:border-ink-border">
              <h2 className="eyebrow">From the news archive</h2>
              <span className="flex-1" />
              <span className="font-sans text-[0.7rem] text-ink-muted dark:text-paper-2/50">
                Archived reporting, kept while it is still useful
              </span>
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
              <h2 className="text-sm font-semibold uppercase tracking-wider">Catzye Guides</h2>
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
                <h2 className="text-lg font-semibold uppercase tracking-wide">{label}</h2>
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

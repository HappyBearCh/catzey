import { prisma } from '@/lib/db';
import { HeroSection } from '@/components/HeroSection';
import { ArticleCard } from '@/components/ArticleCard';
import { LoadMoreArticles } from '@/components/LoadMoreArticles';
import { MostRead } from '@/components/MostRead';
import { TodaysNumber } from '@/components/TodaysNumber';
import { DAILY_CATEGORY } from '@/lib/daily-analysis';
import { getTodaysNumber } from '@/lib/numerology';
import { GROUP_NUMBERS, getGroup } from '@/lib/number-groups';
import { getAllEntries } from '@/lib/shelves';
import { getAllStandaloneGuides } from '@/lib/standalone-guides';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { Article } from '@/lib/types';
import { openGraph, twitter } from '@/lib/seo';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  // `absolute` so the root layout's "%s | Catzye" template does not append a
  // second "Catzye" to a title that already opens with the brand.
  title: { absolute: 'Catzye — Learn Manga: Guides, Glossary & Series Reference' },
  description:
    'Learn how manga works: explainers on genres, craft, history and industry, a full glossary of manga terminology, and reference entries for series and creators.',
  alternates: { canonical: '/' },
  openGraph: openGraph({
    title: 'Catzye — Learn Manga: Guides, Glossary & Series Reference',
    description:
      'Learn how manga works: explainers on genres, craft, history and industry, a full glossary of manga terminology, and reference entries for series and creators.',
    url: BASE,
  }),
  twitter: twitter({ title: 'Catzye — Learn Manga' }),
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

// Frozen edition (see lib/db.ts) — nothing here changes until the next deploy,
// so a timer only bought re-renders and ISR writes for identical output.
export const revalidate = false;

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
        <p className="eyebrow mb-5">Manga, read by the numbers</p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-wide max-w-2xl mx-auto text-ink dark:text-parchment">
          A numerological reference to how manga works
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
              <span className="block font-display font-bold text-seal text-lg mb-2" aria-hidden="true">{i + 1}</span>
              <span className="block font-display text-2xl font-semibold mb-1.5 text-ink dark:text-parchment group-hover:text-gold transition-colors">
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
    name: 'Latest from Catzye',
    itemListElement: articles.slice(0, 10).map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/article/${a.slug}`,
      name: a.title,
    })),
  };

  const today = getTodaysNumber();
  const [featured, ...rest] = articles;
  const secondary = rest.slice(0, 3);
  const gridArticles = rest.slice(3, 9);
  // The front page is arranged the way the reference is: by what each title
  // reduces to, not by what it is about. Explainers and glossary entries come
  // before reporting within a shelf because they are the part that keeps.
  const entries = await getAllEntries();
  const shelves = GROUP_NUMBERS.map((n) => ({
    n,
    group: getGroup(n),
    entries: entries.filter((e) => e.value === n).slice(0, 4),
  })).filter((s) => s.entries.length > 0);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <div className="max-w-8xl mx-auto px-4">
        {/* The educational sections lead the page — they are what the site is
            for. The news archive stays below while it is still live. */}
        {/* The title plate. The numeral is the real Universal Day figure from
            lib/numerology, so the ornament is also the day's reading. */}
        <section className="py-12 md:py-20 text-center">
          <p className="eyebrow mb-8">Manga, read by the numbers</p>

          <div className="flex items-center justify-center gap-5 mb-8" aria-hidden="true">
            <span className="block w-10 h-0.5 bg-ink/30 dark:bg-parchment/30" />
            <span className="sigil sigil-xl">
              {today.number}
            </span>
            <span className="block w-10 h-0.5 bg-ink/30 dark:bg-parchment/30" />
          </div>
          <p className="eyebrow mb-10">
            Today vibrates to {today.number} · {today.profile.keyword}
          </p>

          <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-wide leading-tight max-w-3xl mx-auto text-ink dark:text-parchment">
            A numerological reference to how manga works,
            <span className="italic text-gold"> and where it came from</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-lg leading-relaxed text-ink-2 dark:text-parchment/75">
            Explainers written to be read in order, a glossary of every term you will
            meet, and reference entries for the series and the people who drew them —
            each one read against its numbers.
          </p>

          <div className="rule-ornament max-w-md mx-auto mt-12 mb-10">
            <span className="text-gold text-sm" aria-hidden="true">✦</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto text-left border-y-2 border-ink dark:border-parchment sm:divide-x-2 sm:divide-ink dark:sm:divide-parchment">
            {LEARN_ENTRY_POINTS.map(({ href, title, blurb }, i) => (
              <Link
                key={href}
                href={href}
                className="group p-6 hover:bg-seal/10 transition-colors border-b-2 sm:border-b-0 border-ink/20 dark:border-parchment/20 last:border-b-0"
              >
                <span className="block font-display text-gold/60 text-lg mb-2 tracking-wide" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="block font-display text-2xl font-semibold mb-1.5 text-ink dark:text-parchment group-hover:text-gold transition-colors">
                  {title}
                </span>
                <span className="block text-sm leading-relaxed text-ink-muted dark:text-parchment/55">
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
            <div className="flex items-baseline gap-4 mb-6 pb-2 border-b-2 border-ink dark:border-parchment">
              <h2 className="eyebrow">From the archive</h2>
              <span className="flex-1" />
              <span className="font-display text-[0.8rem] tracking-wide text-ink-muted dark:text-parchment/45">
                Reporting kept while it is still useful
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

        {/* The reference, shelf by shelf */}
        <section className="my-12 border-t-2 border-ink dark:border-parchment pt-10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="eyebrow mb-4">The whole reference, by number</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-wide text-ink dark:text-parchment">
              Twelve shelves
            </h2>
            <p className="mt-4 text-ink-2 dark:text-parchment/70 leading-relaxed">
              Every text here — explainer, glossary entry, reference page, report —
              is filed by the number its title reduces to. Titles that reduce alike
              turn out to be doing alike, which is the only claim this arrangement makes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {shelves.map(({ n, group, entries: shelfEntries }) => (
              <div key={n} className="panel tone-fill flex flex-col">
                {/* A stamped title bar, the way a chapter is ruled off. */}
                <Link href={`/number/${n}`} className="panel-head hover:opacity-80 transition-opacity">
                  <span className="text-base leading-none">{n}</span>
                  <span>{group.shelf}</span>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-sm leading-snug text-ink-muted dark:text-parchment/50 mb-4">
                    {group.tagline}
                  </p>

                <ul className="flex-1">
                  {shelfEntries.map((entry) => (
                    <li key={entry.href}>
                      <Link
                        href={entry.href}
                        className="group flex items-baseline gap-2.5 py-2 border-b border-rule/25 dark:border-rule/60"
                      >
                        <span className="eyebrow shrink-0 whitespace-nowrap basis-[5.5rem] text-ink-muted dark:text-parchment/35">
                          {entry.kindLabel}
                        </span>
                        <span className="min-w-0 font-display text-[0.95rem] leading-snug text-ink-2 dark:text-parchment/80 group-hover:text-gold transition-colors line-clamp-2">
                          {entry.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                  <Link
                    href={`/number/${n}`}
                    className="eyebrow mt-4 text-seal hover:opacity-70 transition-opacity"
                  >
                    The whole shelf →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-8">
            <Link href="/numbers" className="eyebrow text-gold hover:underline">
              How a text gets its number →
            </Link>
          </p>
        </section>

        <LoadMoreArticles initialSkip={30} />
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import { SITE_URL, breadcrumbLd } from '@/lib/seo';
import Link from 'next/link';
import { format } from 'date-fns';
import { prisma } from '@/lib/db';
import { DAILY_CATEGORY, DAILY_SLUG_PREFIX } from '@/lib/daily-column';
import { getProfile, destinyNumber } from '@/lib/numerology';
import type { Article } from '@/lib/types';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

// The daily desk is closed: this is now an archive of a finished run, cut from
// the same frozen edition as everything else (see lib/db.ts). Nothing on it
// moves with the calendar any more, so it needs no timer.
export const revalidate = false;

export const metadata: Metadata = {
  title: 'The Daily Numerology Column — Archive',
  description:
    "The complete run of Catzye's daily column, which read each day's manga and anime headlines through that day's number. The desk is closed; the columns stay up.",
  alternates: { canonical: `${BASE}/numerology/daily` },
  openGraph: {
    siteName: 'Catzye',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og?title=Daily%20Numerology', width: 1200, height: 630 }],
    title: 'The Daily Numerology Column — Archive | Catzye',
    description: "A finished run of columns reading each day's manga and anime headlines through that day's number.",
    url: `${BASE}/numerology/daily`,
  },
};

async function getColumns(): Promise<Article[]> {
  try {
    // Daily columns share the "numerology" category with the essay series, so
    // narrow to the daily desk by its stable slug prefix.
    return (await prisma.article.findMany({
      where: {
        published: true,
        category: DAILY_CATEGORY,
        slug: { startsWith: DAILY_SLUG_PREFIX },
      },
      orderBy: { publishedAt: 'desc' },
      // Deliberately uncapped: the closing paragraph and the JSON-LD both
      // report the run's real length and start date, and a `take` would quietly
      // make both of them wrong. The desk is closed, so the set cannot grow.
    })) as Article[];
  } catch {
    return [];
  }
}

export default async function DailyAnalysisArchive() {
  const columns = await getColumns();
  const [latest, ...rest] = columns;
  const oldest = columns[columns.length - 1];
  // The run's own length and dates, read off the archive rather than written
  // down, so the sentence stays true if the file ever gains or loses a column.
  // Composed as one string: interleaving the commas into JSX leaves a space in
  // front of them.
  const runDates =
    latest && oldest
      ? [oldest, latest]
          .map((c) => format(new Date(c.publishedAt), 'MMMM d, yyyy'))
          .filter((d, i, all) => all.indexOf(d) === i)
          .join(' through ')
      : null;
  const between = runDates ? `, ${runDates},` : '';
  // Two branches rather than one sentence with a hole in it. getColumns()
  // swallows a read failure and returns [], and with no run to name, "and the
  // numbers they were read by" has nothing left to refer back to.
  const closing =
    columns.length === 0
      ? 'The numbers the column was read by are explained in the'
      : `${
          columns.length === 1
            ? `The one column that ran${between} stays up`
            : `All ${columns.length} that ran${between} stay up`
        }. The numbers they were read by are explained in the`;

  // The visible trail and the column list were both invisible to a crawler:
  // this was the last hub on the site carrying no structured data.
  const crumbs = breadcrumbLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Numerology', url: `${SITE_URL}/numerology` },
    { name: 'The Daily Column', url: `${SITE_URL}/numerology/daily` },
  ]);

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'The Daily Numerology Column',
    url: `${SITE_URL}/numerology/daily`,
    numberOfItems: columns.length,
    itemListElement: columns.slice(0, 30).map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/article/${c.slug}`,
      name: c.title,
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/numerology" className="hover:text-primary transition-colors">Numerology</Link>
        <span aria-hidden="true">›</span>
        <span className="text-primary font-bold">The Daily Column</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-semibold mb-3">The Daily Numerology Column</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 max-w-2xl">
        For a while Catzye ran a column each day, reading the biggest manga and anime headlines
        through that day&apos;s number and looking for the thread between them. A lens for paying
        attention, not a forecast.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl">
        The desk is closed and no new column is coming. {closing}{' '}
        <Link href="/numerology" className="text-primary font-semibold hover:underline">
          numerology guide
        </Link>
        .
      </p>

      {columns.length === 0 ? (
        <div className="rounded-sm border border-site-border dark:border-primary/20 p-8 text-center">
          <p className="text-lg font-bold mb-2">No columns in this edition</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The run is not part of the published edition. The numbers it was reading by are
            explained in the{' '}
            <Link href="/numerology" className="text-primary font-semibold hover:underline">
              numerology guide
            </Link>
            .
          </p>
        </div>
      ) : (
        <>
          {/* Latest column, featured */}
          <Link
            href={`/article/${latest.slug}`}
            className="group block mb-8 rounded-sm border border-site-border dark:border-primary/20 p-6 hover:border-primary/50 transition-colors bg-white dark:bg-site-dark-2"
          >
            <span className="text-2xs font-semibold uppercase tracking-widest text-primary-accent">
              Last column · {format(new Date(latest.publishedAt), 'MMMM d, yyyy')}
            </span>
            <h2 className="text-xl md:text-2xl font-semibold leading-tight mt-2 mb-2 group-hover:text-primary transition-colors">
              {latest.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{latest.excerpt}</p>
          </Link>

          {/* Archive list */}
          {rest.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-1 h-5 bg-primary" />
                <h2 className="text-sm font-semibold uppercase tracking-wider">Earlier Columns</h2>
              </div>
              <ul className="divide-y divide-site-border dark:divide-primary/20">
                {rest.map((c) => {
                  const n = destinyNumber(c.title);
                  return (
                    <li key={c.id}>
                      <Link
                        href={`/article/${c.slug}`}
                        className="group flex items-center gap-4 py-3"
                      >
                        <span
                          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                          style={{ backgroundColor: getProfile(n).color }}
                        >
                          {n}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-1">
                            {c.title}
                          </p>
                          <p className="text-2xs text-gray-500 dark:text-gray-400">
                            {format(new Date(c.publishedAt), 'MMMM d, yyyy')}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

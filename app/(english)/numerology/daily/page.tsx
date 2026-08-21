import type { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { prisma } from '@/lib/db';
import { DAILY_CATEGORY } from '@/lib/daily-analysis';
import { getTodaysNumber, getProfile, destinyNumber } from '@/lib/numerology';
import type { Article } from '@/lib/types';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Daily Numerology News Analysis',
  description:
    "Catzye's daily column reads the day's manga and anime headlines through the day's number — the connective thread between the biggest stories, one number at a time.",
  alternates: { canonical: `${BASE}/numerology/daily` },
  openGraph: {
    title: 'Daily Numerology News Analysis | Catzye',
    description: "The day's manga and anime news, read through the day's number.",
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
        slug: { startsWith: 'daily-numerology-' },
      },
      orderBy: { publishedAt: 'desc' },
      take: 60,
    })) as Article[];
  } catch {
    return [];
  }
}

export default async function DailyAnalysisArchive() {
  const columns = await getColumns();
  const today = getTodaysNumber();
  const todayProfile = today.profile;

  const [latest, ...rest] = columns;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/numerology" className="hover:text-primary transition-colors">Numerology</Link>
        <span aria-hidden="true">›</span>
        <span className="text-primary font-bold">Daily Analysis</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-semibold mb-3">Daily Numerology News Analysis</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-2xl">
        Each day, Catzye reads the biggest manga and anime headlines through the day&apos;s number —
        finding the thread that connects them. A lens for paying attention, not a forecast.
      </p>

      {/* Today's number banner */}
      <div className="mb-10 border-2 border-ink dark:border-parchment bg-ground px-5 py-4 flex items-center gap-4">
        <div
          className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-semibold text-white"
          style={{ backgroundColor: todayProfile.color }}
        >
          {today.number}
        </div>
        <p className="text-sm text-gray-200 leading-relaxed">
          <span className="font-semibold text-primary-accent uppercase tracking-widest text-2xs block mb-0.5">
            Today is a {today.number} day
          </span>
          {todayProfile.title} — {todayProfile.vibration}.
        </p>
      </div>

      {columns.length === 0 ? (
        <div className="rounded-sm border border-site-border dark:border-primary/20 p-8 text-center">
          <p className="text-lg font-bold mb-2">The first column is on its way</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Catzye&apos;s daily analysis is generated once a day. Check back soon — or read the{' '}
            <Link href="/numerology" className="text-primary font-semibold hover:underline">
              numerology guide
            </Link>{' '}
            in the meantime.
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
              Latest · {format(new Date(latest.publishedAt), 'MMMM d, yyyy')}
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
                <h2 className="text-sm font-semibold uppercase tracking-wider">Past Columns</h2>
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

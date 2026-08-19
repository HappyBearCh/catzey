import type { Metadata } from 'next';
import Link from 'next/link';
import { getReleasesByDay, DAYS_OF_WEEK, WEEKLY_RELEASES } from '@/lib/calendar';
import { tagHref } from '@/lib/tags';

export const revalidate = 86400;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Manga Release Calendar — Weekly Chapter Schedule',
  description: 'Weekly manga chapter release schedule — know exactly which day your favourite series drops new chapters.',
  alternates: { canonical: `${BASE}/calendar` },
  openGraph: {
    title: 'Manga Release Calendar | Catzye',
    description: 'Weekly chapter release schedule for One Piece, Jujutsu Kaisen, Spy × Family, and more.',
    url: `${BASE}/calendar`,
  },
};

// schema.org day URIs for recurring weekly release schedules.
const SCHEMA_DAY: Record<string, string> = {
  Monday: 'https://schema.org/Monday',
  Tuesday: 'https://schema.org/Tuesday',
  Wednesday: 'https://schema.org/Wednesday',
  Thursday: 'https://schema.org/Thursday',
  Friday: 'https://schema.org/Friday',
  Saturday: 'https://schema.org/Saturday',
  Sunday: 'https://schema.org/Sunday',
};

export default function CalendarPage() {
  const byDay = getReleasesByDay();

  // Expose the weekly schedule as structured data: each series' new-chapter drop
  // is a recurring online Event, so search engines can answer "when does X
  // release" directly. Notes like "Bi-weekly"/"Monthly" are surfaced as the
  // human-readable description since the cadence isn't strictly weekly.
  const eventsLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Weekly Manga Chapter Release Calendar',
    itemListElement: WEEKLY_RELEASES.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: `${r.series} — New Chapter`,
        description: [`New ${r.series} chapter in ${r.magazine}.`, r.note].filter(Boolean).join(' '),
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        eventSchedule: {
          '@type': 'Schedule',
          repeatFrequency: 'P1W',
          byDay: SCHEMA_DAY[r.day],
        },
        location: {
          '@type': 'VirtualLocation',
          name: r.magazine,
          url: r.platformUrl,
        },
        organizer: { '@type': 'Organization', name: r.magazine },
        url: `${BASE}${tagHref(r.series)}`,
      },
    })),
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsLd) }} />
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-1 h-8 bg-primary" />
          <h1 className="text-3xl font-black tracking-tight">Manga Release Calendar</h1>
        </div>
        <p className="text-site-gray dark:text-gray-300 max-w-2xl ml-4">
          Weekly chapter release schedule for the most-read manga series. All times are approximate — check
          each platform for exact release windows.
        </p>
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DAYS_OF_WEEK.map((day) => {
          const releases = byDay[day];
          const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day;

          return (
            <div
              key={day}
              className={`border rounded-sm overflow-hidden ${
                isToday
                  ? 'border-primary shadow-sm'
                  : 'border-site-border dark:border-gray-700'
              }`}
            >
              {/* Day header */}
              <div
                className={`px-4 py-3 flex items-center gap-2 ${
                  isToday
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                }`}
              >
                <h2 className="font-black text-sm uppercase tracking-wider">{day}</h2>
                {isToday && (
                  <span className="ml-auto text-2xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                    Today
                  </span>
                )}
                {releases.length > 0 && !isToday && (
                  <span className="ml-auto text-2xs text-gray-400 dark:text-gray-500">
                    {releases.length} series
                  </span>
                )}
              </div>

              {/* Releases */}
              {releases.length === 0 ? (
                <div className="px-4 py-6 text-center text-xs text-gray-400 dark:text-gray-600 italic">
                  No major releases
                </div>
              ) : (
                <ul className="divide-y divide-site-border dark:divide-gray-800">
                  {releases.map((r) => (
                    <li key={r.series}>
                      <a
                        href={r.platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col px-4 py-3 hover:bg-site-light dark:hover:bg-gray-800 transition-colors group"
                      >
                        <span className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">
                          {r.series}
                        </span>
                        <span className="text-2xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {r.magazine}
                        </span>
                        {r.note && (
                          <span className="text-2xs text-primary/70 mt-0.5 italic">{r.note}</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Platform links */}
      <div className="mt-10 p-5 bg-site-light dark:bg-gray-900 border border-site-border dark:border-gray-700 rounded-sm">
        <p className="text-xs font-black uppercase tracking-wider text-primary mb-3">Read Legally</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Manga Plus (Free)', url: 'https://mangaplus.shueisha.co.jp' },
            { label: 'Viz Manga ($2.99/mo)', url: 'https://www.viz.com/shonenjump' },
            { label: 'Crunchyroll Manga', url: 'https://www.crunchyroll.com/manga' },
            { label: 'Shōnen Jump+', url: 'https://shonenjumpplus.com' },
            { label: 'Comic Natalie', url: 'https://natalie.mu/comic' },
          ].map(({ label, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-primary border border-primary/30 px-3 py-1.5 rounded hover:bg-primary hover:text-white transition-colors"
            >
              {label} ↗
            </a>
          ))}
        </div>
        <p className="text-2xs text-gray-400 dark:text-gray-500 mt-3">
          Schedules shown are typical release windows and may shift due to magazine holidays, author hiatuses, or platform delays.
        </p>
      </div>

      {/* Browse by tag */}
      <div className="mt-8 border-t border-site-border dark:border-gray-700 pt-6">
        <p className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3">Browse News by Series</p>
        <div className="flex flex-wrap gap-2">
          {['One Piece', 'Jujutsu Kaisen', 'My Hero Academia', 'Chainsaw Man', 'Spy × Family', 'Frieren', 'Blue Lock', 'Demon Slayer'].map((tag) => (
            <Link
              key={tag}
              href={tagHref(tag)}
              className="text-xs font-semibold text-primary border border-primary/30 px-3 py-1.5 hover:bg-primary hover:text-white transition-colors rounded-sm"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

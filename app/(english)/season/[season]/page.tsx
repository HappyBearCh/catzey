import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { NumberReading } from '@/components/NumberReading';
import { getSeason, getAllSeasons } from '@/lib/seasons';

// Frozen edition (see lib/db.ts) — nothing here changes until the next deploy,
// so a timer only bought re-renders and ISR writes for identical output.
export const revalidate = false;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props { params: Promise<{ season: string }> }

export async function generateStaticParams() {
  return getAllSeasons().map((s) => ({ season: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { season } = await params;
  const data = getSeason(season);
  if (!data) return {};
  return {
    title: `${data.label} Anime — What's Airing This Season`,
    description: `Complete guide to ${data.label} anime: every series airing this season with synopsis, studios, and where to watch.`,
    alternates: { canonical: `${BASE}/season/${season}` },
    openGraph: {
      siteName: 'Catzye',
      locale: 'en_US',
      type: 'website',
      images: [{ url: `/og?title=${encodeURIComponent(data.label + ' Anime')}`, width: 1200, height: 630 }],
      title: `${data.label} Anime Season | Catzye`,
      description: `Every anime airing in ${data.label} — synopsis, studios, and streaming platforms.`,
      url: `${BASE}/season/${season}`,
    },
  };
}

const SOURCE_LABELS: Record<string, string> = {
  manga: 'Manga',
  'light novel': 'Light Novel',
  original: 'Original',
  'visual novel': 'Visual Novel',
  'web novel': 'Web Novel',
};

export default async function SeasonPage({ params }: Props) {
  const { season } = await params;
  const data = getSeason(season);
  if (!data) notFound();

  const allSeasons = getAllSeasons();
  const airing = data.shows.filter((s) => s.status === 'airing');
  const upcoming = data.shows.filter((s) => s.status === 'upcoming');
  const finished = data.shows.filter((s) => s.status === 'finished');

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Season Guide', item: `${BASE}/season/spring-2026` },
      { '@type': 'ListItem', position: 3, name: data.label, item: `${BASE}/season/${season}` },
    ],
  };

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${data.label} Anime`,
    numberOfItems: data.shows.length,
    itemListElement: data.shows.map((show, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: show.title,
    })),
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/season/spring-2026" className="hover:text-primary">Season Guide</Link>
        <span aria-hidden="true">›</span>
        <span className="text-gray-800 dark:text-gray-200">{data.label}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          {data.status === 'current' && (
            <span className="bg-primary text-white text-2xs font-bold uppercase tracking-widest px-2 py-0.5">
              Current Season
            </span>
          )}
          {data.status === 'upcoming' && (
            <span className="bg-gray-700 text-white text-2xs font-bold uppercase tracking-widest px-2 py-0.5">
              Coming Soon
            </span>
          )}
        </div>
        <h1 className="text-4xl font-semibold tracking-tight mb-3">{data.label} Anime</h1>
        <p className="text-site-gray dark:text-gray-300 max-w-2xl">
          {data.shows.length} series · {airing.length} currently airing
          {upcoming.length > 0 && ` · ${upcoming.length} upcoming`}
        </p>

        <NumberReading
          title={`${data.label} Anime`}
          label="season"
          seed={data.slug}
          className="mt-6 max-w-3xl"
        />
      </div>

      {/* Season navigation */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {allSeasons.map((s) => (
          <Link
            key={s.slug}
            href={`/season/${s.slug}`}
            className={`flex-shrink-0 text-xs font-bold uppercase tracking-wider px-4 py-2 border transition-colors ${
              s.slug === season
                ? 'bg-primary text-white border-primary'
                : 'border-site-border dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary'
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {/* Airing shows */}
      {airing.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-1 h-6 bg-primary" />
            <h2 className="text-lg font-semibold uppercase tracking-wide">Currently Airing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {airing.map((show) => <ShowCard key={show.title} show={show} />)}
          </div>
        </section>
      )}

      {/* Upcoming shows */}
      {upcoming.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-1 h-6 bg-gray-400" />
            <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">Upcoming</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {upcoming.map((show) => <ShowCard key={show.title} show={show} upcoming />)}
          </div>
        </section>
      )}

      {/* Finished */}
      {finished.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-1 h-6 bg-gray-300" />
            <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-500">Finished</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {finished.map((show) => <ShowCard key={show.title} show={show} />)}
          </div>
        </section>
      )}

      <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-sm">
        <p className="text-xs text-amber-700 dark:text-amber-400">
          Season lineups are subject to change. Episode counts and streaming platforms are indicative and may vary by region.
        </p>
      </div>
    </div>
  );
}

function ShowCard({ show, upcoming = false }: { show: import('@/lib/seasons').AnimeEntry; upcoming?: boolean }) {
  return (
    <div className={`border rounded-sm overflow-hidden bg-white dark:bg-gray-900 ${upcoming ? 'border-dashed border-gray-300 dark:border-gray-700 opacity-80' : 'border-site-border dark:border-gray-700'}`}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base leading-snug">{show.title}</h3>
          {show.day && (
            <span className="flex-shrink-0 text-2xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
              {show.day}s
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {show.genres.map((g) => (
            <span key={g} className="text-2xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">
              {g}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-3">
          {show.synopsis}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-2xs text-gray-500 dark:text-gray-400 border-t border-site-border dark:border-gray-800 pt-3">
          <span><strong className="text-gray-700 dark:text-gray-300">Studio:</strong> {show.studio}</span>
          <span><strong className="text-gray-700 dark:text-gray-300">Source:</strong> {SOURCE_LABELS[show.source] ?? show.source}</span>
          {show.episodes !== null && (
            <span><strong className="text-gray-700 dark:text-gray-300">Episodes:</strong> {show.episodes}</span>
          )}
        </div>

        {show.whereToWatch.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {show.whereToWatch.map((platform) => (
              <span key={platform} className="text-2xs font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded">
                {platform}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

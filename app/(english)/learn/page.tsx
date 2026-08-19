import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllLearnTopics, LEARN_TRACKS } from '@/lib/education';

export const revalidate = 3600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Learn Manga — Guides, Explainers & Reading Paths',
  description:
    'Learn how manga works, from first steps to craft and industry: what the genres mean, how a page is built, how the medium got here, and where to start reading.',
  alternates: { canonical: `${BASE}/learn` },
  openGraph: {
    title: 'Learn Manga — Guides, Explainers & Reading Paths',
    description: 'Structured explainers covering manga basics, genres, craft, history and industry.',
    url: `${BASE}/learn`,
    images: [{ url: `/og?title=${encodeURIComponent('Learn Manga')}`, width: 1200, height: 630 }],
  },
};

export default async function LearnHubPage() {
  const topics = await getAllLearnTopics();

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: `${BASE}/learn` },
    ],
  };

  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Manga explainers',
    itemListElement: topics.slice(0, 100).map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.title,
      url: `${BASE}/learn/${t.slug}`,
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <span>Learn</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Learn Manga</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
        Start anywhere. Each track is a short, ordered path — read it straight through, or
        jump to the one question you came for.
      </p>

      <div className="space-y-10">
        {LEARN_TRACKS.map((track) => {
          const inTrack = topics.filter((t) => t.track === track.slug);
          return (
            <section key={track.slug}>
              <div className="flex items-center gap-2 mb-1">
                <span className="block w-1 h-6 bg-primary" />
                <h2 className="text-xl font-black tracking-tight">{track.label}</h2>
                <span className="text-2xs font-bold text-gray-400 uppercase tracking-wider">
                  {inTrack.length} {inTrack.length === 1 ? 'lesson' : 'lessons'}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 ml-3">{track.blurb}</p>

              {inTrack.length === 0 ? (
                <p className="text-sm text-gray-400 ml-3 italic">Coming soon.</p>
              ) : (
                <ol className="border border-site-border rounded-sm divide-y divide-site-border">
                  {inTrack.map((t, i) => (
                    <li key={t.slug}>
                      <Link
                        href={`/learn/${t.slug}`}
                        className="flex items-start gap-4 p-4 hover:bg-primary/5 transition-colors group"
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-black flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-bold leading-snug group-hover:text-primary transition-colors">
                            {t.title}
                          </span>
                          <span className="block text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
                            {t.summary}
                          </span>
                        </span>
                        <span className="ml-auto flex-shrink-0 text-2xs font-bold uppercase tracking-wider text-gray-400 self-center">
                          {t.level}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

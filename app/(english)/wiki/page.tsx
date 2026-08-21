import type { Metadata } from 'next';
import Link from 'next/link';
import { ShelfBand } from '@/components/ShelfBand';
import { getAllWorks, getAllCreators } from '@/lib/education';

export const revalidate = false; // content is baked in at build time — never revalidate

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Manga Wiki — Series & Creator Reference',
  description:
    'Reference entries for manga series and the people who make them: publication history, demographics, genres, magazines, and the creators behind each work.',
  alternates: { canonical: `${BASE}/wiki` },
  openGraph: {
    title: 'Manga Wiki — Series & Creator Reference',
    description: 'Reference entries for manga series and their creators.',
    url: `${BASE}/wiki`,
    images: [{ url: `/og?title=${encodeURIComponent('Manga Wiki')}`, width: 1200, height: 630 }],
  },
};

export default async function WikiIndexPage() {
  const [works, creators] = await Promise.all([getAllWorks(), getAllCreators()]);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Wiki', item: `${BASE}/wiki` },
    ],
  };

  const seriesListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Manga series reference entries',
    numberOfItems: works.length,
    itemListElement: works.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/wiki/series/${w.slug}`,
      name: w.title,
    })),
  };

  const creatorListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Manga creator reference entries',
    numberOfItems: creators.length,
    itemListElement: creators.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/wiki/creator/${c.slug}`,
      name: c.name,
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creatorListLd) }} />

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <span>Wiki</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Manga Wiki</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
        Reference entries for the works themselves and the people who make them — what a
        series is, when it ran, where it was serialised, and who drew it.
      </p>

      <ShelfBand
        titles={[...works.map((w) => w.title), ...creators.map((c) => c.name)]}
        noun="entries"
        className="mb-10"
      />

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="block w-1 h-6 bg-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Series</h2>
          <span className="text-2xs font-bold text-gray-400 uppercase tracking-wider">{works.length}</span>
        </div>
        {works.length === 0 ? (
          <p className="text-sm text-gray-400 italic ml-3">Entries are being written.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {works.map((w) => (
              <li key={w.slug}>
                <Link href={`/wiki/series/${w.slug}`} className="block p-3 border border-site-border rounded-sm hover:border-primary/40 transition-colors group">
                  <span className="font-bold text-sm block group-hover:text-primary transition-colors">{w.title}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{w.synopsis}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="block w-1 h-6 bg-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Creators</h2>
          <span className="text-2xs font-bold text-gray-400 uppercase tracking-wider">{creators.length}</span>
        </div>
        {creators.length === 0 ? (
          <p className="text-sm text-gray-400 italic ml-3">Entries are being written.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {creators.map((c) => (
              <li key={c.slug}>
                <Link href={`/wiki/creator/${c.slug}`} className="block p-3 border border-site-border rounded-sm hover:border-primary/40 transition-colors group">
                  <span className="font-bold text-sm block group-hover:text-primary transition-colors">{c.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{c.bio}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

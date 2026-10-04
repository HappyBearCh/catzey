import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllWorks, getAllCreators } from '@/lib/education';

export const revalidate = false; // content is baked in at build time — never revalidate

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Manga Wiki — Series & Creator Reference',
  description:
    'Reference entries for manga series and the people who make them: publication history, demographics, genres, magazines, and the creators behind each work.',
  alternates: { canonical: `${BASE}/wiki` },
  openGraph: {
    siteName: 'Catzye',
    locale: 'en_US',
    type: 'website',
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
      <p className="text-ink-2 dark:text-parchment/80 mb-5 max-w-2xl">
        Reference entries for the works themselves and the people who make them — what a
        series is, when it ran, where it was serialised, and who drew it.
      </p>
      {/* Two long lists on one page: say how long, and let the reader jump. */}
      <p className="mb-10 flex gap-6">
        <a href="#series" className="eyebrow text-gold hover:opacity-70">{works.length} series ↓</a>
        <a href="#creators" className="eyebrow text-gold hover:opacity-70">{creators.length} creators ↓</a>
      </p>

      <section id="series" className="mb-14 scroll-mt-4">
        <h2 className="font-display text-2xl font-semibold mb-2 pb-2 border-b-2 border-ink dark:border-parchment">Series</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
          {works.map((w) => (
            <li key={w.slug}>
              <Link
                href={`/wiki/series/${w.slug}`}
                className="group block py-3 border-b border-rule/25 dark:border-rule/60"
              >
                <span className="flex items-baseline gap-3">
                  <span className="min-w-0 flex-1 font-display text-lg leading-snug text-ink dark:text-parchment group-hover:text-gold transition-colors">
                    {w.title}
                  </span>
                  <span className="shrink-0 text-sm text-gray-500">
                    {[w.startYear, w.volumes ? `${w.volumes} vols` : null].filter(Boolean).join(' · ')}
                  </span>
                </span>
                <span className="block mt-0.5 text-sm text-ink-muted dark:text-parchment/65 line-clamp-1">
                  {w.synopsisSource ?? w.synopsis}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="creators" className="mb-14 scroll-mt-4">
        <h2 className="font-display text-2xl font-semibold mb-2 pb-2 border-b-2 border-ink dark:border-parchment">Creators</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
          {creators.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/wiki/creator/${c.slug}`}
                className="group block py-3 border-b border-rule/25 dark:border-rule/60"
              >
                <span className="flex items-baseline gap-3">
                  <span className="min-w-0 flex-1 font-display text-lg leading-snug text-ink dark:text-parchment group-hover:text-gold transition-colors">
                    {c.name}
                  </span>
                  {c.nativeName && <span className="shrink-0 text-sm text-gray-500">{c.nativeName}</span>}
                </span>
                <span className="block mt-0.5 text-sm text-ink-muted dark:text-parchment/65 line-clamp-1">
                  {c.bioSource ?? c.bio}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-ink-muted dark:text-parchment/65">
        Also in the reference:{' '}
        <Link href="/sets" className="text-gold hover:underline">numbered sets</Link>, the groups manga count
        by — the Four Emperors, the Hashira, the Gotei 13.
      </p>
    </div>
  );
}

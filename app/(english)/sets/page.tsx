import type { Metadata } from 'next';
import Link from 'next/link';
import { getSetsByCount, getAllNumberedSets } from '@/lib/numbered-sets';
import { getGroup } from '@/lib/number-groups';

export const revalidate = false; // the edition is baked in at build time

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Numbered Sets — The Numerology Manga Practises on Itself',
  description:
    'The Four Emperors, the Twelve Kizuki, the Gotei 13, the Eight Inner Gates — the numbered sets manga invented for itself, and what each number is doing.',
  alternates: { canonical: `${BASE}/sets` },
  openGraph: {
    siteName: 'Catzye',
    locale: 'en_US',
    type: 'website',
    title: 'Numbered Sets | Catzye',
    description: 'The numbered hierarchies manga invented for itself, and what each number is doing.',
    url: `${BASE}/sets`,
    images: [{ url: `/og?title=${encodeURIComponent('Numbered Sets')}`, width: 1200, height: 630 }],
  },
};

export default function SetsIndexPage() {
  const grouped = getSetsByCount();
  const total = getAllNumberedSets().length;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Numbered Sets', item: `${BASE}/sets` },
    ],
  };

  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Numbered sets in manga',
    numberOfItems: total,
    itemListElement: getAllNumberedSets().map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name,
      url: `${BASE}/sets/${s.slug}`,
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />

      <nav className="eyebrow flex items-center gap-2 mb-8">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <span>Numbered Sets</span>
      </nav>

      <header className="text-center max-w-2xl mx-auto mb-14">
        <p className="eyebrow mb-6">The numerology manga practises on itself</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-wide text-ink dark:text-parchment">
          Numbered
          <span className="italic text-gold"> sets</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-2 dark:text-parchment/75">
          Four Emperors. Nine Tailed Beasts. Twelve Kizuki, split into an Upper Six and a Lower
          Six. Thirteen numbered squads. Manga is saturated with sets whose size was chosen
          deliberately, and the choice is nearly always doing work.
        </p>
        <div className="rule-ornament max-w-sm mx-auto mt-10">
          <span className="text-gold text-sm" aria-hidden="true">✦</span>
        </div>
      </header>

      <section className="max-w-reading mx-auto ref-prose mb-14">
        <p>
          Shōnen has one problem it must solve on every page: making relative strength legible
          instantly, in black and white, without stopping to explain. A numbered set solves it
          outright. Upper Rank Three outranks Upper Rank Four and nobody has to be told; a
          fox with nine tails is stronger than one with eight because a reader can count. Once a
          medium finds a device that cheap, it uses it everywhere — which is why this section
          exists.
        </p>
        <p>
          A number also creates a debt. Announce twelve and the reader is owed twelve, and a
          serialisation that ends before it pays leaves the last few as names on a chart. The
          entries here note where that happened.
        </p>
        <p>
          <strong>These are the only texts on Catzye filed by a number nobody imposed.</strong>{' '}
          Everything else here is shelved by reducing its title, which the{' '}
          <Link href="/numbers">filing system</Link> is candid about being an imposition. A set is
          shelved by its own count, because its author already chose one.
        </p>
      </section>

      {grouped.map(({ count, value, sets }) => {
        const group = getGroup(value);
        return (
          <section key={count} className="mb-12">
            <div className="flex items-center gap-4 mb-5 pb-2 border-b-2 border-ink dark:border-parchment">
              <span className="sigil sigil-md shrink-0" aria-hidden="true">
                {count}
              </span>
              <h2 className="font-display text-2xl text-ink dark:text-parchment">
                Sets of {count}
              </h2>
              <span className="flex-1" />
              <Link href={`/number/${value}`} className="eyebrow hover:text-gold transition-colors">
                {count === value ? 'shelved at' : `reduces to ${value} ·`} {group.shelf}
              </Link>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sets.map((set) => (
                <li key={set.slug}>
                  <Link
                    href={`/sets/${set.slug}`}
                    className="group block panel tone-fill p-4 h-full hover:bg-paper-2 dark:hover:bg-ground-2 transition-colors"
                  >
                    <span className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-display text-lg font-bold text-ink dark:text-parchment group-hover:text-seal transition-colors">
                        {set.name}
                      </span>
                      {set.nativeName && (
                        <span className="text-sm text-ink-muted dark:text-parchment/45">
                          {set.nativeName}
                        </span>
                      )}
                    </span>
                    {set.work && (
                      <span className="block eyebrow mt-1 text-ink-muted dark:text-parchment/40">
                        {set.work} · {set.form}
                      </span>
                    )}
                    {!set.work && (
                      <span className="block eyebrow mt-1 text-ink-muted dark:text-parchment/40">
                        the medium at large · {set.form}
                      </span>
                    )}
                    <span className="block text-sm leading-relaxed text-ink-2 dark:text-parchment/65 mt-1.5">
                      {set.shortDef}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className="text-sm text-ink-muted dark:text-parchment/55 mt-10 max-w-2xl mx-auto text-center leading-relaxed">
        {total} sets so far. Nothing here was included to fill a shelf — several numbers have no
        entry at all, because manga did not happen to use them.
      </p>
    </div>
  );
}

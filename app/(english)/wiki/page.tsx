import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllWorks, getAllCreators } from '@/lib/education';
import { Breadcrumbs } from '@/components/Breadcrumbs';

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creatorListLd) }} />

      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Wiki', href: '/wiki' }]} />

      <h1 className="font-display text-3xl md:text-[2.6rem] font-bold tracking-tight leading-tight text-ink dark:text-parchment mb-3">
        Manga Wiki
      </h1>
      <p className="text-lg leading-relaxed text-ink-2 dark:text-parchment/80 mb-8 max-w-2xl">
        Reference entries for the works themselves and the people who make them — what a
        series is, when it ran, where it was serialised, and who drew it.
      </p>

      <Section
        id="series"
        title={`${works.length} series`}
        items={works.map((w) => ({
          href: `/wiki/series/${w.slug}`,
          title: w.title,
          meta: [w.startYear, w.volumes ? `${w.volumes} vols` : null].filter(Boolean).join(' · '),
          note: w.synopsisSource ?? w.synopsis,
        }))}
      />

      <Section
        id="creators"
        title={`${creators.length} creators`}
        items={creators.map((c) => ({
          href: `/wiki/creator/${c.slug}`,
          title: c.name,
          meta: c.nativeName ?? '',
          note: c.bioSource ?? c.bio,
        }))}
      />

      <p className="text-ink-muted dark:text-parchment/65">
        Also in the reference:{' '}
        <Link href="/sets" className="text-gold hover:underline">numbered sets</Link>, the groups manga count
        by — the Four Emperors, the Hashira, the Gotei 13.
      </p>
    </div>
  );
}

interface Item {
  href: string;
  title: string;
  meta: string;
  note: string;
}

function letterOf(title: string): string {
  const c = title.normalize('NFD').replace(/[̀-ͯ]/g, '').charAt(0).toUpperCase();
  return /[A-Z]/.test(c) ? c : '#';
}

/**
 * A long alphabetical list, cut into letters with a jump bar on top. Two
 * hundred and fifty entries in one run is a long scroll on a phone; the bar
 * gets a reader to "N" in one tap, and each letter is a named anchor.
 */
function Section({ id, title, items }: { id: string; title: string; items: Item[] }) {
  const groups = new Map<string, Item[]>();
  for (const item of items) {
    const l = letterOf(item.title);
    groups.set(l, [...(groups.get(l) ?? []), item]);
  }
  const letters = [...groups.keys()].sort((a, b) => (a === '#' ? -1 : b === '#' ? 1 : a.localeCompare(b)));

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mb-14 scroll-mt-20">
      <h2 id={`${id}-title`} className="font-display text-2xl font-bold tracking-tight mb-3 text-ink dark:text-parchment capitalize">
        {title}
      </h2>
      <nav aria-label={`Jump to a letter in ${id}`} className="mb-4">
        <ul className="flex flex-wrap gap-1">
          {letters.map((l) => (
            <li key={l}>
              <a
                href={`#${id}-${l === '#' ? 'num' : l.toLowerCase()}`}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-line font-sans text-sm text-ink-2 dark:text-parchment/75 hover:border-gold/40 hover:text-gold transition-colors"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {letters.map((l) => (
        <div key={l} id={`${id}-${l === '#' ? 'num' : l.toLowerCase()}`} className="scroll-mt-20">
          <h3 className="mt-6 mb-1 font-sans text-sm font-semibold text-gold">{l}</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 border-t border-line">
            {groups.get(l)!.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group block py-3 border-b border-line">
                  <span className="flex items-baseline gap-3">
                    <span className="min-w-0 flex-1 font-display text-lg leading-snug text-ink dark:text-parchment group-hover:text-gold transition-colors">
                      {item.title}
                    </span>
                    {item.meta && <span className="shrink-0 font-sans text-sm text-ink-muted dark:text-parchment/55">{item.meta}</span>}
                  </span>
                  <span className="block mt-0.5 text-sm text-ink-muted dark:text-parchment/65 line-clamp-1">{item.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

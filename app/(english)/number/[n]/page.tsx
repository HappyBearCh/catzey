import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  GROUP_NUMBERS,
  getGroup,
  parseGroupParam,
  groupProfile,
} from '@/lib/number-groups';
import { getShelf, type ShelfEntry } from '@/lib/shelves';

export const revalidate = false; // the edition is baked in at build time

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export function generateStaticParams() {
  return GROUP_NUMBERS.map((n) => ({ n: String(n) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const n = parseGroupParam((await params).n);
  if (!n) return { title: 'Not found' };
  const group = getGroup(n);
  const title = `${n} — ${group.shelf}`;
  const description = `Every text on Catzye whose title reduces to ${n}: ${group.tagline}. ${group.howToRead}`;
  return {
    title,
    description,
    alternates: { canonical: `${BASE}/number/${n}` },
    openGraph: {
      title: `${title} | Catzye`,
      description,
      url: `${BASE}/number/${n}`,
      images: [{ url: `/og?title=${encodeURIComponent(title)}`, width: 1200, height: 630 }],
    },
  };
}

// Shelves list explainers and glossary before reporting: the reference is meant
// to be read, and the archive is the part that ages.
const KIND_ORDER: ShelfEntry['kind'][] = [
  // Numbered sets lead: they are the one kind on the shelf that arrived at this
  // number by its author's choice rather than by the reference's arithmetic.
  'set',
  'lesson',
  'glossary',
  'work',
  'creator',
  'guide',
  'series',
  'article',
];

const KIND_HEADING: Record<string, string> = {
  set: 'Numbered by their authors',
  lesson: 'Explainers',
  glossary: 'Glossary',
  work: 'Series',
  creator: 'Creators',
  guide: 'Guides',
  series: 'Sequences',
  article: 'From the archive',
};

export default async function ShelfPage({ params }: { params: Promise<{ n: string }> }) {
  const n = parseGroupParam((await params).n);
  if (!n) notFound();

  const group = getGroup(n);
  const profile = groupProfile(n);
  const entries = await getShelf(n);

  const sections = KIND_ORDER.map((kind) => ({
    kind,
    heading: KIND_HEADING[kind],
    items: entries.filter((e) => e.kind === kind),
  })).filter((s) => s.items.length > 0);

  const index = GROUP_NUMBERS.indexOf(n as (typeof GROUP_NUMBERS)[number]);
  const prev = index > 0 ? GROUP_NUMBERS[index - 1] : null;
  const next = index < GROUP_NUMBERS.length - 1 ? GROUP_NUMBERS[index + 1] : null;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'The Shelves', item: `${BASE}/numbers` },
      { '@type': 'ListItem', position: 3, name: `${n} — ${group.shelf}`, item: `${BASE}/number/${n}` },
    ],
  };

  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${n} — ${group.shelf}`,
    description: group.tagline,
    url: `${BASE}/number/${n}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: entries.length,
      itemListElement: entries.slice(0, 100).map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: e.title,
        url: `${BASE}${e.href}`,
      })),
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />

      <nav className="eyebrow flex items-center gap-2 mb-8">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/numbers" className="hover:text-gold transition-colors">Shelves</Link>
        <span aria-hidden="true">›</span>
        <span>{n}</span>
      </nav>

      <header className="text-center max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-5 mb-7" aria-hidden="true">
          <span className="text-gold/40 text-sm">⁘</span>
          <span className="sigil w-20 h-20 md:w-24 md:h-24 text-4xl md:text-5xl border border-gold/40">
            {n}
          </span>
          <span className="text-gold/40 text-sm">⁘</span>
        </div>
        <p className="eyebrow mb-5">
          {group.master ? 'Master number' : 'Shelf'} {group.roman} · {profile.keyword}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-wide text-ink dark:text-parchment">
          {group.shelf}
        </h1>
        <p className="mt-4 text-lg italic text-gold/90 dark:text-gold-pale/80">{group.tagline}</p>
      </header>

      <section className="max-w-reading mx-auto ref-prose mb-12">
        <p>{group.intro}</p>
        <p>
          <strong>How to read this shelf.</strong> {group.howToRead}
        </p>
        <p>
          <strong>Where it overreaches.</strong> {group.shadow}
        </p>
      </section>

      <div className="rule-ornament max-w-md mx-auto mb-12">
        <span className="text-gold text-sm" aria-hidden="true">✦</span>
      </div>

      {entries.length === 0 ? (
        <p className="text-center text-ink-muted dark:text-parchment/55 py-12">
          Nothing has reduced to {n} yet. The arithmetic decides what lands here, so this shelf
          fills on its own or not at all.
        </p>
      ) : (
        <>
          <p className="eyebrow text-center mb-10">
            {entries.length} {entries.length === 1 ? 'text' : 'texts'} reduce to {n}
          </p>

          {sections.map((section) => (
            <section key={section.kind} className="mb-12">
              <div className="flex items-baseline gap-4 mb-5 pb-2 border-b border-gold/25">
                <h2 className="eyebrow">{section.heading}</h2>
                <span className="flex-1" />
                <span className="eyebrow text-ink-muted dark:text-parchment/45">
                  {section.items.length}
                </span>
              </div>

              <ul>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex gap-4 py-4 border-b border-rule/40 dark:border-rule last:border-0 hover:bg-gold/5 transition-colors -mx-2 px-2"
                    >
                      <span
                        className="shrink-0 font-display text-sm text-gold/60 tabular-nums w-12 pt-1 text-right"
                        aria-hidden="true"
                      >
                        {item.raw}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-lg leading-snug text-ink dark:text-parchment group-hover:text-gold transition-colors">
                          {item.title}
                        </span>
                        <span className="block text-sm leading-relaxed text-ink-muted dark:text-parchment/55 mt-1 line-clamp-2">
                          {item.summary}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      )}

      <nav className="flex items-stretch justify-between gap-4 border-t border-gold/25 pt-6 mt-14">
        {prev ? (
          <Link href={`/number/${prev}`} className="group flex-1 text-left">
            <span className="eyebrow block mb-1">Previous shelf</span>
            <span className="font-display text-lg text-ink dark:text-parchment group-hover:text-gold transition-colors">
              {prev} · {getGroup(prev).shelf}
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        <Link href="/numbers" className="self-center eyebrow hover:text-gold transition-colors px-4">
          All twelve
        </Link>
        {next ? (
          <Link href={`/number/${next}`} className="group flex-1 text-right">
            <span className="eyebrow block mb-1">Next shelf</span>
            <span className="font-display text-lg text-ink dark:text-parchment group-hover:text-gold transition-colors">
              {next} · {getGroup(next).shelf}
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </nav>
    </div>
  );
}

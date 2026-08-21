import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllNumberedSets,
  getNumberedSet,
  getSetNeighbours,
  setValue,
} from '@/lib/numbered-sets';
import { getGroup, titleValue, titleNumbers } from '@/lib/number-groups';
import { getWork } from '@/lib/education';
import { getCreator } from '@/lib/education';
import { countStrokes } from '@/lib/strokes';

export const revalidate = false; // the edition is baked in at build time

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export function generateStaticParams() {
  return getAllNumberedSets().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const set = getNumberedSet((await params).slug);
  if (!set) return { title: 'Not found' };
  const title = `${set.name}${set.nativeName ? ` (${set.nativeName})` : ''}`;
  return {
    title,
    description: set.shortDef,
    alternates: { canonical: `${BASE}/sets/${set.slug}` },
    openGraph: {
      title: `${title} | Catzye`,
      description: set.shortDef,
      url: `${BASE}/sets/${set.slug}`,
      images: [{ url: `/og?title=${encodeURIComponent(set.name)}`, width: 1200, height: 630 }],
    },
  };
}

export default async function NumberedSetPage({ params }: { params: Promise<{ slug: string }> }) {
  const set = getNumberedSet((await params).slug);
  if (!set) notFound();

  const n = setValue(set);
  const group = getGroup(n);
  const neighbours = getSetNeighbours(set.slug);
  const work = set.workSlug ? getWork(set.workSlug) : null;
  const creator = set.creatorSlug ? getCreator(set.creatorSlug) : null;

  // The contrast this page exists to draw: what the reference's own arithmetic
  // would have said about the phrase, against the number the author chose.
  const byTitle = titleNumbers(set.name);
  const titleShelf = getGroup(titleValue(set.name));
  const disagrees = byTitle.value !== n;
  const strokes = set.nativeName ? countStrokes(set.nativeName) : null;
  const strokeTotal = strokes && strokes.missing.length === 0 && strokes.chars.length > 0 ? strokes.total : null;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Numbered Sets', item: `${BASE}/sets` },
      { '@type': 'ListItem', position: 3, name: set.name, item: `${BASE}/sets/${set.slug}` },
    ],
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: set.name,
    description: set.shortDef,
    url: `${BASE}/sets/${set.slug}`,
    isPartOf: { '@type': 'CollectionPage', name: 'Numbered sets in manga', url: `${BASE}/sets` },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <nav className="eyebrow flex items-center gap-2 mb-6">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/sets" className="hover:text-gold transition-colors">Sets</Link>
        <span aria-hidden="true">›</span>
        <span>{set.count}</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-start gap-5">
          <Link
            href={`/number/${n}`}
            className="sigil shrink-0 w-16 h-16 text-2xl border border-gold/40 hover:border-gold transition-colors"
            aria-label={`Filed under ${n}, ${group.shelf}`}
          >
            {set.count}
          </Link>
          <div className="min-w-0">
            <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-wide text-ink dark:text-parchment leading-tight">
              {set.name}
            </h1>
            {(set.nativeName || set.romaji) && (
              <p className="mt-1 text-lg text-ink-muted dark:text-parchment/55">
                {set.nativeName}
                {set.nativeName && set.romaji && ' · '}
                {set.romaji && <em>{set.romaji}</em>}
              </p>
            )}
            <p className="eyebrow mt-2">
              {set.work ? (
                work ? (
                  <Link href={`/wiki/series/${work.slug}`} className="hover:text-gold transition-colors">
                    {set.work}
                  </Link>
                ) : (
                  set.work
                )
              ) : (
                'the medium at large'
              )}
              {' · '}
              {set.form}
              {creator && (
                <>
                  {' · '}
                  <Link href={`/wiki/creator/${creator.slug}`} className="hover:text-gold transition-colors">
                    {creator.name}
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </header>

      <p className="text-lg md:text-xl font-display leading-snug border-l-2 border-gold pl-5 py-2 mb-8 text-ink dark:text-parchment">
        {set.shortDef}
      </p>

      {/* The point of the section, stated once per entry. */}
      <section className="border-y border-gold/25 py-5 mb-8" aria-label="How this entry is filed">
        <p className="eyebrow mb-3">Filed by its count, not its title</p>
        <div className="num-working">
          <span className="num-word num-word-match">
            <span className="num-word-text">the count</span>
            <span className="num-word-value">
              {set.count === n ? set.count : `${set.count} → ${n}`}
            </span>
          </span>
          {strokeTotal !== null && (
            <span className="num-word">
              <span className="num-word-text">総画 {set.nativeName}</span>
              <span className="num-word-value">{strokeTotal}</span>
            </span>
          )}
          <span className="num-word">
            <span className="num-word-text">its English name</span>
            <span className="num-word-value">
              {byTitle.raw} → {byTitle.value}
            </span>
          </span>
        </div>
        <p className="text-sm leading-relaxed text-ink-2 dark:text-parchment/70 mt-4">
          {disagrees ? (
            <>
              Reduced as a phrase, &ldquo;{set.name}&rdquo; would sit on{' '}
              <Link href={`/number/${byTitle.value}`} className="text-gold hover:underline">
                {titleShelf.shelf}
              </Link>{' '}
              — but that would be reducing wording this reference chose. The set is filed under{' '}
              <Link href={`/number/${n}`} className="text-gold hover:underline">
                {n} · {group.shelf}
              </Link>{' '}
              instead, because {set.count} is what its author chose, and a chosen number outranks
              an imposed one.
            </>
          ) : (
            <>
              Its count and its English name happen to reduce alike, so both routes reach{' '}
              <Link href={`/number/${n}`} className="text-gold hover:underline">
                {n} · {group.shelf}
              </Link>
              . The count is still what files it — the agreement is a coincidence, not the reason.
            </>
          )}
        </p>
        {strokeTotal !== null && strokeTotal === set.count && (
          <p className="text-sm leading-relaxed text-ink-2 dark:text-parchment/70 mt-3">
            Worth noting on its own: {set.nativeName} is written in {strokeTotal} strokes, which is
            also how many members the set has. The reference has no theory about that and offers
            none — it simply counted twice and got the same answer.
          </p>
        )}
      </section>

      <div className="ref-prose" dangerouslySetInnerHTML={{ __html: set.body }} />

      {neighbours.length > 0 && (
        <aside className="border-t border-gold/30 pt-5 mt-10" aria-label={`Other sets on ${group.shelf}`}>
          <p className="eyebrow mb-4">
            Also filed under {n} · {group.shelf}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            {neighbours.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/sets/${other.slug}`}
                  className="group flex items-baseline gap-3 py-2.5 border-b border-rule/30 dark:border-rule"
                >
                  <span className="eyebrow shrink-0 w-8 text-ink-muted dark:text-parchment/40">
                    {other.count}
                  </span>
                  <span className="min-w-0 font-display text-[0.95rem] leading-snug text-ink dark:text-parchment group-hover:text-gold transition-colors">
                    {other.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <nav className="flex items-center justify-between gap-4 border-t border-gold/25 pt-6 mt-10">
        <Link href="/sets" className="eyebrow hover:text-gold transition-colors">
          ← All numbered sets
        </Link>
        <Link href={`/number/${n}`} className="eyebrow hover:text-gold transition-colors">
          {group.shelf} →
        </Link>
      </nav>
    </div>
  );
}

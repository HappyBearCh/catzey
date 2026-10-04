import type { Metadata } from 'next';
import Link from 'next/link';
import { GROUP_NUMBERS, getGroup, titleNumbers } from '@/lib/number-groups';
import { getShelfCounts, getAllEntries } from '@/lib/shelves';
import { TitleCalculator, type ShelfExample } from '@/components/TitleCalculator';

export const revalidate = false; // the edition is baked in at build time

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Manga Title Numerology Calculator & the Twelve Shelves',
  description:
    'Type any manga or anime title to see its Pythagorean numerology, worked letter by letter, and the shelf it files to — then browse everything Catzye files under each of the twelve numbers.',
  alternates: { canonical: `${BASE}/numbers` },
  openGraph: {
    siteName: 'Catzye',
    locale: 'en_US',
    type: 'website',
    title: 'The Twelve Shelves | Catzye',
    description: 'Every text on the site, filed by the number its title reduces to.',
    url: `${BASE}/numbers`,
    images: [{ url: `/og?title=${encodeURIComponent('The Twelve Shelves')}`, width: 1200, height: 630 }],
  },
};

// The worked example on this page is computed rather than typed, so it can never
// drift from the arithmetic the rest of the site actually uses.
const EXAMPLE_TITLE = 'Weekly Shonen Jump';

// Kind labels are singular nouns; only "Glossary" is already a mass noun and
// stays as it is.
function plural(label: string, count: number): string {
  const lower = label.toLowerCase();
  if (count === 1 || lower === 'glossary' || lower.endsWith('s')) return lower;
  return `${lower}s`;
}

export default async function NumbersIndexPage() {
  const counts = await getShelfCounts();
  const byNumber = new Map(counts.map((c) => [c.n, c]));
  const total = counts.reduce((s, c) => s + c.total, 0);
  const example = titleNumbers(EXAMPLE_TITLE);

  // A few reference entries per shelf for the calculator to point into —
  // explainers and wiki entries first, since getAllEntries lists them first.
  const entries = await getAllEntries();
  const examples: Record<number, ShelfExample[]> = {};
  for (const n of GROUP_NUMBERS) {
    examples[n] = entries
      .filter((e) => e.value === n)
      .slice(0, 4)
      .map((e) => ({ title: e.title, href: e.href, kindLabel: e.kindLabel }));
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'The Twelve Shelves', item: `${BASE}/numbers` },
    ],
  };

  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'The Twelve Shelves',
    itemListElement: GROUP_NUMBERS.map((n, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${n} — ${getGroup(n).shelf}`,
      url: `${BASE}/number/${n}`,
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />

      <nav className="eyebrow flex items-center gap-2 mb-8">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <span>The Shelves</span>
      </nav>

      <header className="text-center max-w-2xl mx-auto mb-14">
        <p className="eyebrow mb-6">The filing system</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-wide text-ink dark:text-parchment">
          Twelve shelves,
          <span className="italic text-gold"> one rule</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-2 dark:text-parchment/75">
          Categories tell you what a text is <em>about</em>. They are useful and they are not
          how this reference is arranged. Every one of the {total.toLocaleString('en-US')} texts here is
          filed instead by the number its title reduces to — which turns out to say something
          about what shape the text has, and puts a glossary entry, a thirty-year-old
          serialisation and last week&apos;s announcement on the same shelf when they are doing
          the same thing.
        </p>
        <div className="rule-ornament max-w-sm mx-auto mt-10">
          <span className="text-gold text-sm" aria-hidden="true">✦</span>
        </div>
      </header>

      {/* The rule, worked on a real title so the reader can check it. */}
      <section className="max-w-2xl mx-auto mb-16 border-y-2 border-ink dark:border-parchment py-8">
        <h2 className="eyebrow mb-5 text-center">How a text is filed</h2>
        <p className="text-ink-2 dark:text-parchment/75 leading-relaxed mb-6">
          Each letter carries a digit — A is 1, B is 2, on to I at 9, then the alphabet starts
          over. Sum the letters of the title, then reduce the sum by adding its digits together
          until one figure remains. The master numbers 11, 22 and 33 are never reduced, which is
          why they get shelves of their own and why so few texts reach them.
        </p>
        <div className="num-working" role="group" aria-label={`Letter values of ${EXAMPLE_TITLE}`}>
          {example.words.map((w) => (
            <span className="num-word" key={w.word}>
              <span className="num-word-text">{w.word}</span>
              <span className="num-word-value">{w.sum}</span>
            </span>
          ))}
          <span className="num-word num-word-total">
            <span className="num-word-text">total</span>
            <span className="num-word-value">
              {example.raw} → {example.value}
            </span>
          </span>
        </div>
        <p className="text-sm text-ink-muted dark:text-parchment/55 mt-5">
          “{EXAMPLE_TITLE}” totals {example.raw}, reduces to {example.value}, and is therefore read
          from{' '}
          <Link href={`/number/${example.value}`} className="text-gold hover:underline">
            {getGroup(example.value).shelf}
          </Link>
          . Nothing about the magazine changes; the shelf only decides what it gets read next to.
        </p>
      </section>

      {/* The rule as a tool. */}
      <section className="max-w-2xl mx-auto mb-16" aria-labelledby="calculator">
        <h2 id="calculator" className="font-display text-3xl font-semibold tracking-wide text-center mb-2 text-ink dark:text-parchment">
          Read any title
        </h2>
        <p className="text-center text-ink-muted dark:text-parchment/60 mb-8">
          The same arithmetic, on whatever you type. It is worked in your browser and sent nowhere.
        </p>
        <TitleCalculator examples={examples} placeholder="Fullmetal Alchemist" />
      </section>

      {/* The shelves themselves. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {GROUP_NUMBERS.map((n) => {
          const group = getGroup(n);
          const count = byNumber.get(n);
          return (
            <Link
              key={n}
              href={`/number/${n}`}
              className="group panel tone-fill p-6 md:p-7 hover:bg-paper-2 dark:hover:bg-ground-2 transition-colors flex gap-5"
            >
              <span
                className="sigil sigil-lg shrink-0"
                aria-hidden="true"
              >
                {n}
              </span>
              <span className="min-w-0">
                <span className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-display text-2xl font-semibold text-ink dark:text-parchment group-hover:text-gold transition-colors">
                    {group.shelf}
                  </span>
                  {group.master && (
                    <span className="eyebrow text-seal dark:text-seal-bright">master</span>
                  )}
                </span>
                <span className="block text-sm leading-relaxed text-ink-2 dark:text-parchment/70 mt-1.5">
                  {group.tagline}
                </span>
                <span className="block eyebrow mt-3 text-ink-muted dark:text-parchment/55">
                  {count?.total ?? 0} {count?.total === 1 ? 'text' : 'texts'}
                  {count && count.byKind.length > 0 && (
                    <> · {count.byKind.map((k) => `${k.count} ${plural(k.label, k.count)}`).join(', ')}</>
                  )}
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      <p className="text-sm text-ink-muted dark:text-parchment/55 mt-10 max-w-2xl mx-auto text-center leading-relaxed">
        One section is filed differently.{' '}
        <Link href="/sets" className="text-gold hover:underline">Numbered sets</Link> — the Four
        Emperors, the Twelve Kizuki, the Gotei 13 — go on the shelf of their own count, because
        their authors chose a number and a chosen number outranks a calculated one.
      </p>

      <p className="text-sm text-ink-muted dark:text-parchment/55 mt-4 max-w-2xl mx-auto text-center leading-relaxed">
        The shelves are uneven on purpose. Nothing was moved to balance them, and 2, 22 and 33 are
        nearly empty because the arithmetic rarely lands there — a sum that reduces to 11 stops at
        11 rather than continuing down to 2. What each number means is set out in the{' '}
        <Link href="/numerology" className="text-gold hover:underline">numerology guide</Link>.
      </p>
    </div>
  );
}

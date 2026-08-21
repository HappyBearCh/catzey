import type { Metadata } from 'next';
import Link from 'next/link';
import { NUMBER_PROFILES, getTodaysNumber } from '@/lib/numerology';
import { getGroup } from '@/lib/number-groups';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const revalidate = false; // content is baked in at build time — never revalidate

export const metadata: Metadata = {
  title: 'Numerology Guide — What the Numbers Mean',
  description:
    'How Catzye reads every headline, category, and day through numerology. The meaning of numbers 1–9 and the master numbers 11, 22, and 33, plus how Destiny, Heart, and Personality numbers are calculated.',
  alternates: { canonical: `${BASE}/numerology` },
  openGraph: {
    title: 'Numerology Guide | Catzye',
    description:
      'The meaning of numbers 1–9 and the master numbers 11, 22, 33 — the numerological lens behind every Catzye story.',
    url: `${BASE}/numerology`,
  },
};

const ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

export default function NumerologyPage() {
  const today = getTodaysNumber();

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ORDER.map((n) => {
      const p = NUMBER_PROFILES[n];
      return {
        '@type': 'Question',
        name: `What does the number ${n} mean in numerology?`,
        acceptedAnswer: { '@type': 'Answer', text: `${p.title}. ${p.meaning}` },
      };
    }),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <span className="text-primary font-bold">Numerology</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-semibold mb-4">The Numbers Behind the News</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-2xl">
        Catzye files every text on the site by the number its title reduces to, and reads every
        day through the same system — an old one, mapping letters to numbers and numbers to
        meaning. It is a lens for paying attention, not a forecast. Here is how the arithmetic
        works, what each number means, and which{' '}
        <Link href="/numbers" className="text-primary font-semibold hover:underline">
          shelf
        </Link>{' '}
        each one governs.
      </p>

      {/* Today's number callout */}
      <div className="mb-10 border-2 border-ink dark:border-parchment bg-ground px-5 py-4 flex items-center gap-4">
        <div
          className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-semibold text-white"
          style={{ backgroundColor: today.profile.color }}
        >
          {today.number}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-gray-200 leading-relaxed">
            <span className="font-semibold text-primary-accent uppercase tracking-widest text-2xs block mb-0.5">
              Today is a {today.number} day
            </span>
            {today.profile.title} — {today.profile.vibration}.
          </p>
          <Link
            href="/numerology/daily"
            className="mt-1 inline-block text-2xs font-bold uppercase tracking-widest text-primary-accent hover:underline"
          >
            Read today&apos;s news analysis →
          </Link>
        </div>
      </div>

      {/* Essay series callout */}
      <Link
        href="/series/numbers-behind-the-manga"
        className="group mb-10 block rounded-sm border border-primary/30 p-5 bg-site-light dark:bg-site-dark-2 hover:border-primary/60 transition-colors"
      >
        <span className="text-2xs font-semibold uppercase tracking-widest text-primary-accent">
          Essay Series
        </span>
        <h2 className="text-xl font-semibold mt-1 mb-1.5 group-hover:text-primary transition-colors">
          The Numbers Behind the Manga
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          A numerological reading of the medium — the Big Three, the heroes, the mangaka, and the
          studios, seen through the numbers their names reduce to.{' '}
          <span className="font-bold text-primary group-hover:underline">Read the series →</span>
        </p>
      </Link>

      {/* How the numbers are calculated */}
      <div className="article-prose text-gray-800 dark:text-gray-200 mb-10">
        <h2>The three core numbers</h2>
        <p>
          For any name or headline, Catzye calculates three numbers using standard Pythagorean
          numerology — every letter A–Z mapped to a digit 1–9, summed, then reduced to a single
          digit (or a master number: 11, 22, 33).
        </p>
        <ul>
          <li>
            <strong>Destiny (Expression) Number</strong> — the sum of <em>all</em> letters. The
            overall character and direction.
          </li>
          <li>
            <strong>Heart&apos;s Desire (Soul) Number</strong> — the sum of the <em>vowels</em>. What
            it wants underneath.
          </li>
          <li>
            <strong>Personality (Dream) Number</strong> — the sum of the <em>consonants</em>. How it
            appears to the world.
          </li>
        </ul>
        <p>
          Master numbers 11, 22, and 33 are never reduced — they carry a heightened, more demanding
          version of their root (2, 4, and 6).
        </p>
      </div>

      {/* The number grid */}
      <div className="flex items-center gap-3 mb-5">
        <span className="block w-1 h-6 bg-primary" />
        <h2 className="text-lg font-semibold uppercase tracking-wide">Meaning of Each Number</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {ORDER.map((n) => {
          const p = NUMBER_PROFILES[n];
          return (
            <div
              key={n}
              className="rounded-sm border border-site-border dark:border-primary/20 p-4 flex gap-4 bg-white dark:bg-site-dark-2"
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold text-white"
                style={{ backgroundColor: p.color }}
              >
                {n}
              </div>
              <div className="min-w-0">
                <Link
                  href={`/number/${n}`}
                  className="text-2xs font-bold uppercase tracking-widest text-primary hover:underline block mb-0.5"
                >
                  {getGroup(n).shelf} →
                </Link>
                <h3 className="font-semibold text-sm">
                  {p.title}
                  {p.master && (
                    <span className="ml-2 text-2xs font-bold uppercase tracking-wider text-primary-accent">
                      Master
                    </span>
                  )}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-1">
                  {p.meaning}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.keywords.slice(0, 4).map((k) => (
                    <span
                      key={k}
                      className="text-2xs font-semibold px-1.5 py-0.5 bg-site-light text-primary border border-site-border rounded-sm dark:bg-primary/10 dark:border-primary/30 dark:text-primary-accent"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-sm border border-site-border dark:border-primary/20 p-5 bg-site-light dark:bg-site-dark-2">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Every text on Catzye carries a reading of its title — the working printed underneath it,
          computed rather than written — and every one of them lives on the shelf its number
          governs. Start with{' '}
          <Link href="/numbers" className="text-primary font-semibold hover:underline">
            the twelve shelves
          </Link>{' '}
          to see how a title is filed, or open a shelf and read what landed there.
        </p>
      </div>
    </div>
  );
}

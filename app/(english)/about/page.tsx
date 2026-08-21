import type { Metadata } from 'next';
import Link from 'next/link';
import { GROUP_NUMBERS, getGroup, titleNumbers } from '@/lib/number-groups';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'About Catzye',
  description:
    'Catzye is a reference to how manga works, arranged by numerology: every text is filed by the number its title reduces to, across twelve shelves. What that means, why it was done, and what it does not claim.',
  alternates: { canonical: `${BASE}/about` },
};

// The worked example is computed, not typed, so this page can never describe
// arithmetic the site does not actually perform.
const EXAMPLE = 'Weekly Shonen Jump';

export default function AboutPage() {
  const example = titleNumbers(EXAMPLE);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-wide mb-2">
        About Catzye
      </h1>
      <p className="eyebrow mb-8">A reference to how manga works, filed by number</p>

      <div className="article-prose text-gray-800 dark:text-gray-200">
        <p>
          Catzye explains how manga works — its genres, its craft, its history, and the industry
          that produces it — in explainers meant to be read in order, a glossary of every term
          you will meet, and reference entries for the series and the people who drew them. A
          news archive sits underneath it, kept for as long as it is useful.
        </p>
        <p>
          What makes it unusual is the arrangement. Nothing here is filed by topic. Every text on
          the site is filed by <strong>the number its title reduces to</strong>, on one of{' '}
          <Link href="/numbers">twelve shelves</Link>.
        </p>

        <h2>How a text is filed</h2>
        <p>
          Each letter carries a digit — A is 1, B is 2, through I at 9, then the alphabet begins
          again. Sum the letters of a title and reduce the total by adding its digits together
          until a single figure remains. The master numbers 11, 22 and 33 are never reduced,
          which is why they have shelves of their own and why so few texts reach them.
        </p>
        <p>
          &ldquo;{EXAMPLE}&rdquo; totals {example.raw}, which reduces to {example.value}. It is
          therefore read from{' '}
          <Link href={`/number/${example.value}`}>{getGroup(example.value).shelf}</Link>, next to
          everything else that reduced the same way.
        </p>

        <h2>What the arrangement claims</h2>
        <p>
          Very little, and it is worth being exact about it. Catzye does not claim the universe
          assigns meaning to titles, that a number predicts anything, or that the arithmetic
          uncovers a truth about a work that its author put there. Numerology is not a science
          and this site does not pretend otherwise.
        </p>
        <p>
          What a constraint <em>does</em> do — even an arbitrary one — is force fresh attention.
          Filing by number puts a glossary entry, a thirty-year-old serialisation and last
          week&apos;s announcement on the same shelf, and asks what they have in common. Often
          the answer is nothing. Often enough it is something, and it is something a topic-based
          index would never have surfaced, because topic indexes only ever group things that
          were already known to belong together.
        </p>
        <p>
          The shelves are also uneven, and were left that way. Nothing was moved to balance them.{' '}
          {getGroup(2).shelf} is nearly empty because a sum reducing to 11 stops at 11 rather
          than continuing down to 2, and {getGroup(22).shelf} and {getGroup(33).shelf} hold a
          handful of texts each. That unevenness is the arithmetic being honest.
        </p>

        <h2>The twelve shelves</h2>
        <ul>
          {GROUP_NUMBERS.map((n) => {
            const group = getGroup(n);
            return (
              <li key={n}>
                <Link href={`/number/${n}`}>
                  <strong>
                    {n} — {group.shelf}
                  </strong>
                </Link>
                : {group.tagline}
              </li>
            );
          })}
        </ul>

        <h2>How the readings are written</h2>
        <p>
          Every text on the site carries a numerological reading: a line above it and a full
          reading below. None of those readings was written by hand and none was written by a
          language model. They are composed from the title&apos;s own arithmetic by a script in
          this repository, which is why the figures quoted in a reading are always the real
          figures for that exact title, and why rebuilding the site produces the same words
          again. The reference is file-backed and versioned; there is no database behind it, and
          every published text is reviewable as a diff before it ships.
        </p>

        <h2>Contact</h2>
        <p>
          Spotted an error, or want to argue with a shelf? See our{' '}
          <Link href="/contact">contact page</Link>. Our standards for sourcing and corrections
          are set out in the <Link href="/editorial-policy">editorial policy</Link>, and what
          each number is taken to mean is set out in the{' '}
          <Link href="/numerology">numerology guide</Link>.
        </p>
      </div>
    </div>
  );
}

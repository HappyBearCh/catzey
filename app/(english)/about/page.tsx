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
          What makes it unusual is the arrangement. Nothing here is filed by topic. Almost every
          text on the site is filed by <strong>the number its title reduces to</strong>, on one of{' '}
          <Link href="/numbers">twelve shelves</Link>. The exception is the one section where the
          number was never ours to impose — see below.
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

        <h2>The sets we did not number</h2>
        <p>
          Manga numbers itself constantly. The Four Emperors, the Nine Tailed Beasts, the Twelve
          Kizuki split into an Upper Six and a Lower Six, the Gotei 13 — shōnen is full of sets
          whose size an author chose deliberately, usually to make relative strength legible at a
          glance without a word of explanation. Those entries live in{' '}
          <Link href="/sets">Numbered Sets</Link>, and they are filed by their own count rather
          than by their titles, because a number somebody chose outranks one this reference
          calculated. It is the only section here where the shelf is not an imposition.
        </p>

        <h2>Reading the Japanese</h2>
        <p>
          The Pythagorean reduction has a real weakness and it is worth naming: applied to a manga
          it usually reduces an English title, and an English title is a licensing decision.
          &ldquo;Attack on Titan&rdquo; was settled by a publisher in 2012;{' '}
          <span lang="ja">進撃の巨人</span> is what Isayama wrote.
        </p>
        <p>
          So series and creator entries also carry <span lang="ja">画数</span> — the stroke count
          of the name as it is actually written — and, for people, the five figures of{' '}
          <span lang="ja">姓名判断</span>, the Japanese system of name divination by stroke count.
          That system matters here for a specific reason: it is used in Japan to choose names,
          including pen names, so of every reading on this site those are the likeliest to have
          been intended by their subject. The stroke tables are hand-entered and the code prints
          nothing for a character it cannot count.
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

        <h2>Where a number is not imposed</h2>
        <p>
          Three kinds of number on this site were not calculated by us, and where they contradict
          the title reduction the entry says so and the figure wins: a series&apos; volume count
          and run length, the stroke count of a Japanese name, and the size of a set its author
          numbered. A title is a decision somebody made about a thing. Those are the thing.
        </p>

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

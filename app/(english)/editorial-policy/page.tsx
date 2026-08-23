import type { Metadata } from 'next';
import { SITE_URL, breadcrumbLd } from '@/lib/seo';
import Link from 'next/link';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'How Catzye sources and corrects its manga reference, how the numerological reading on every page is produced, and what the numbers are not claimed to mean.',
  alternates: { canonical: `${BASE}/editorial-policy` },
};

const pageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Editorial Policy',
  url: `${SITE_URL}/editorial-policy`,
  isPartOf: { '@id': `${SITE_URL}/#website` },
};

const crumbs = breadcrumbLd([
  { name: 'Home', url: SITE_URL },
  { name: 'Editorial Policy', url: `${SITE_URL}/editorial-policy` },
]);

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-wide mb-2">
        Editorial Policy
      </h1>
      <p className="eyebrow mb-8">Sourcing, corrections, and what the numbers claim</p>

      <div className="article-prose text-gray-800 dark:text-gray-200">
        <h2>Sourcing</h2>
        <p>
          Reference entries — explainers, glossary terms, series and creator pages — are written
          against published scholarship, publisher and studio material, and the works themselves.
          Archived reporting is based on established industry outlets or official announcements
          from publishers, studios, and creators, and each report links to its original source so
          readers can verify it. We do not publish rumours as fact.
        </p>

        <h2>The numerological readings</h2>
        <p>
          Every text on this site carries a reading of its title: a line above the text, and a
          fuller reading below it. Three things are worth stating plainly about them.
        </p>
        <p>
          <strong>They are computed, not written.</strong> Each reading is composed from the
          title&apos;s own arithmetic by a script in this repository. No editor writes them by
          hand and no language model generates them. The consequence is that the numbers quoted
          in a reading are always the genuine figures for that exact title, and that rebuilding
          the site produces the identical text again — a reading cannot quietly drift away from
          the arithmetic it claims to describe.
        </p>
        <p>
          <strong>The method is fixed and published.</strong> Titles are reduced with standard
          Pythagorean numerology: every letter A–Z mapped to a digit 1–9, summed, then reduced
          until a single digit or a master number remains. Vowels alone give the Heart&apos;s
          Desire, consonants alone the Personality. The working is printed under every title so
          you can check it. What each figure is taken to mean is set out in the{' '}
          <Link href="/numerology">numerology guide</Link>, and the shelves themselves in{' '}
          <Link href="/numbers">the filing system</Link>.
        </p>
        <p>
          <strong>They are a lens, not a claim.</strong> Catzye does not assert that numerology
          is predictive, that a title&apos;s sum reveals an author&apos;s intent, or that the
          arrangement discovers anything the works did not already contain. A reading is an
          organising frame — a constraint that forces attention onto texts you might otherwise
          skim, and that occasionally puts two of them side by side to useful effect. Where a
          reading and the facts disagree, the facts win, and the entry says so.
        </p>

        <h2>Where facts and readings are kept separate</h2>
        <p>
          A reading never alters the reporting or the reference material it accompanies. It is
          fitted around the text — above it and below it — and is marked as apparatus wherever it
          appears. Quotations, figures, dates and names are never rephrased to suit a number.
        </p>

        <h2>Use of AI</h2>
        <p>
          Parts of the archive were drafted with AI assistance from source reporting and reviewed
          before publication; those pieces remain linked to the outlets that reported them. The
          reference material and the numerological readings are not model-generated. Images
          generated with AI are labelled &ldquo;Illustration&rdquo; directly on the image. AI
          assistance never replaces attribution — original reporting is always credited and
          linked.
        </p>

        <h2>Corrections</h2>
        <p>
          When we get something wrong, we fix it. Substantive corrections are made directly in
          the text and its modification date is updated. Because readings are computed from
          titles, correcting a title also recomputes its reading and may move the text to a
          different shelf; that is intended, and no attempt is made to keep a text where it was.
          If you spot an error, please <Link href="/contact">contact us</Link> — correction
          requests are prioritised over all other mail.
        </p>

        <h2>Independence</h2>
        <p>
          Catzye is independently operated. We do not accept payment for coverage, and no text is
          filed under a number, moved between shelves, or promoted for commercial reasons.
          Sponsored content, if ever published, will be clearly labelled as such.
        </p>

        <h2>Images</h2>
        <p>
          Images are sourced from the original reporting, from openly licensed photography, or
          generated as labelled illustrations. If you are a rights holder and believe an image is
          used in error, <Link href="/contact">contact us</Link> and we will review it promptly.
        </p>
      </div>
    </div>
  );
}

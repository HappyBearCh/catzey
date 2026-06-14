import type { Metadata } from 'next';
import Link from 'next/link';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'How Catzye sources, writes, and corrects its manga and anime news coverage, including our use of AI tools.',
  alternates: { canonical: `${BASE}/editorial-policy` },
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black mb-6">Editorial Policy</h1>
      <div className="article-prose text-gray-800 dark:text-gray-200">
        <h2>Sourcing</h2>
        <p>
          Every Catzye story is based on reporting from established industry outlets or official
          announcements from publishers, studios, and creators. We do not publish rumors as fact.
          Each article links to its original source at the bottom of the page so readers can
          verify the reporting themselves.
        </p>

        <h2>Use of AI</h2>
        <p>
          We are transparent about this: Catzye uses AI tools to help draft and summarize
          articles from source reporting. Drafts are reviewed before publication, and our
          editorial commentary (marked as &ldquo;Catzye Take&rdquo;) reflects the site&apos;s
          perspective. Images generated with AI are labeled &ldquo;Illustration&rdquo; directly
          on the image. AI assistance never replaces attribution — the original reporting is
          always credited and linked.
        </p>

        <h2>Corrections</h2>
        <p>
          When we get something wrong, we fix it. Substantive corrections are made directly in
          the article, and the article&apos;s modification date is updated. If you spot an error,
          please <Link href="/contact">contact us</Link> — corrections requests are prioritized
          over all other mail.
        </p>

        <h2>Independence</h2>
        <p>
          Catzye is independently operated. We do not accept payment for coverage, and sponsored
          content, if ever published, will be clearly labeled as such.
        </p>

        <h2>Images</h2>
        <p>
          Article images are sourced from the original reporting, from openly licensed
          photography, or generated as labeled illustrations. If you are a rights holder and
          believe an image is used in error, <Link href="/contact">contact us</Link> and we will
          review it promptly.
        </p>
      </div>
    </div>
  );
}

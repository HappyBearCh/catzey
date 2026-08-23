import type { Metadata } from 'next';
import { SITE_URL, breadcrumbLd } from '@/lib/seo';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Catzye handles your data: what is collected, what is stored, how long it is kept, and the choices you have. The site counts letters, not readers.',
  alternates: { canonical: `${BASE}/privacy` },
};

const pageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy',
  url: `${SITE_URL}/privacy`,
  isPartOf: { '@id': `${SITE_URL}/#website` },
};

const crumbs = breadcrumbLd([
  { name: 'Home', url: SITE_URL },
  { name: 'Privacy Policy', url: `${SITE_URL}/privacy` },
]);

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-wide mb-2">Privacy Policy</h1>
      <p className="eyebrow mb-8">What is counted, and what is not</p>
      <div className="article-prose text-gray-800 dark:text-gray-200">
        <p>
          Catzye counts letters, not readers. The site is built to collect as little personal
          data as possible, and it holds no database of visitors: the reference itself is a set
          of files in a repository, and every reading on it is computed from a title rather than
          from anything about the person reading it. Which shelf you browse is not recorded, and
          nothing you read here is used to decide what you are shown next.
        </p>
        <p>This page explains the little that is collected, and why.</p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Newsletter subscriptions:</strong> if you subscribe, we store your email
            address solely to send you the newsletter. Every email includes a one-click
            unsubscribe link that permanently removes your address from our database.
          </li>
          <li>
            <strong>Article view counts:</strong> we count how many times each article is viewed.
            These counts are aggregate numbers only and are not tied to you or your device.
          </li>
        </ul>

        <h2>What stays on your device</h2>
        <p>
          Saved articles (bookmarks) and your light/dark theme preference are stored in your
          browser&apos;s local storage. They never leave your device and we cannot see them.
        </p>

        <h2>What we don&apos;t do</h2>
        <ul>
          <li>We do not sell or share personal data with third parties.</li>
          <li>We do not use advertising trackers or cross-site tracking cookies.</li>
          <li>We do not require an account to read anything on the site.</li>
        </ul>

        <h2>Hosting</h2>
        <p>
          The site is hosted on Vercel, whose infrastructure may process standard technical
          request data (such as IP addresses) to serve the site and protect it from abuse, as
          described in Vercel&apos;s own privacy documentation.
        </p>

        <h2>Questions</h2>
        <p>
          If you have questions about your data — including a request to delete a newsletter
          subscription manually — reach us via the contact page.
        </p>
      </div>
    </div>
  );
}

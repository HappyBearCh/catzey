import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Catzye handles your data: what we collect, what we store, and your choices.',
  alternates: { canonical: `${BASE}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>
      <div className="article-prose text-gray-800 dark:text-gray-200">
        <p>
          Catzye is built to collect as little personal data as possible. This page explains what
          we do collect and why.
        </p>

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

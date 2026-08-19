import type { Metadata } from 'next';
import Link from 'next/link';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@catzye.com';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Catzye team — news tips, corrections, and image or rights inquiries.',
  alternates: { canonical: `${BASE}/contact` },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Contact</h1>
      <div className="article-prose text-gray-800 dark:text-gray-200">
        <p>
          The fastest way to reach us is by email:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold">
            {CONTACT_EMAIL}
          </a>
        </p>

        <h2>Corrections</h2>
        <p>
          Spotted a factual error? Email us with the article link and what&apos;s wrong.
          Corrections are prioritized over all other mail — see our{' '}
          <Link href="/editorial-policy">editorial policy</Link> for how we handle them.
        </p>

        <h2>News tips</h2>
        <p>
          Have a story we should cover? Send the details and a source we can verify. We read
          every tip.
        </p>

        <h2>Rights &amp; image inquiries</h2>
        <p>
          If you are a rights holder with a question or concern about an image or excerpt used on
          Catzye, email us with the article link and we will review it promptly.
        </p>
      </div>
    </div>
  );
}

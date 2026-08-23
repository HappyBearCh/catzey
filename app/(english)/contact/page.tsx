import type { Metadata } from 'next';
import { SITE_URL, breadcrumbLd } from '@/lib/seo';
import Link from 'next/link';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@catzye.com';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Catzye — corrections, entries we are missing, arguments with a shelf, and image or rights inquiries.',
  alternates: { canonical: `${BASE}/contact` },
};

const pageLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact',
  url: `${SITE_URL}/contact`,
  isPartOf: { '@id': `${SITE_URL}/#website` },
};

const crumbs = breadcrumbLd([
  { name: 'Home', url: SITE_URL },
  { name: 'Contact', url: `${SITE_URL}/contact` },
]);

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-wide mb-2">Contact</h1>
      <p className="eyebrow mb-8">Corrections first, arguments welcome</p>
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

        <h2>Missing entries</h2>
        <p>
          A term the glossary does not define, a series the wiki has no page for, an explainer
          that should exist? Send it. Nothing gets added because a shelf looks thin — a text is
          written because it is worth writing, and then its title decides where it lands.
        </p>

        <h2>Arguments with a shelf</h2>
        <p>
          If a text reads wrong where it has been filed, say so. The arithmetic is not up for
          negotiation and neither is the filing rule, but{' '}
          <Link href="/numbers">what a shelf is taken to mean</Link> is editorial, and that part
          is worth arguing about. We will not move a text off its number; we will happily rewrite
          a shelf that describes its contents badly.
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

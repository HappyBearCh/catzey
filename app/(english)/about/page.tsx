import type { Metadata } from 'next';
import Link from 'next/link';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'About Catzye',
  description:
    'Catzye covers manga, anime, manhwa, and light novel news — who we are, how we work, and how to reach us.',
  alternates: { canonical: `${BASE}/about` },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">About Catzye</h1>
      <div className="article-prose text-gray-800 dark:text-gray-200">
        <p>
          Catzye is an independent news site covering manga, anime, manhwa, light novels, and the
          industry behind them. We track release announcements, licensing deals, adaptation news,
          creator updates, and event coverage from around the world, and publish concise,
          readable reports throughout the day.
        </p>

        <h2>What we cover</h2>
        <p>
          Our coverage spans ten sections — from new manga chapters and anime season announcements
          to publisher business news and convention reports. We focus on what matters to readers
          and fans: what&apos;s coming out, when, where you can read or watch it legally, and why
          it matters.
        </p>

        <h2>How our newsroom works</h2>
        <p>
          Catzye monitors established industry sources such as Anime News Network, MyAnimeList,
          ICv2, The Beat, and Bleeding Cool. Stories are drafted with the assistance of AI tools
          and reviewed by our editorial team before publication. Every article links to its
          original source so you can verify the reporting and read further. Our standards for
          sourcing, AI use, and corrections are described in our{' '}
          <Link href="/editorial-policy">editorial policy</Link>.
        </p>

        <h2>Contact</h2>
        <p>
          Spotted an error, have a news tip, or want to get in touch? See our{' '}
          <Link href="/contact">contact page</Link>. We read everything.
        </p>
      </div>
    </div>
  );
}

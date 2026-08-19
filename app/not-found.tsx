import Link from 'next/link';
import type { Metadata } from 'next';
import { SearchInput } from '@/components/SearchInput';
import { CATEGORIES } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

const POPULAR = [
  { label: 'Home', href: '/' },
  { label: 'Trending', href: '/trending' },
  { label: 'Release Calendar', href: '/calendar' },
  { label: 'Season Guide', href: '/season/spring-2026' },
  { label: 'Guides', href: '/guides' },
];

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="sigil w-16 h-16 text-2xl mb-6">
        404
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4 text-ink dark:text-parchment">Page Not Found</h1>
      <p className="text-ink-2 dark:text-parchment/70 mb-8 max-w-md mx-auto leading-relaxed">
        The article or page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try searching, or jump to one of our popular sections below.
      </p>

      {/* Search box for recovery */}
      <div className="max-w-md mx-auto mb-8 ">
        <SearchInput placeholder="Search manga & anime news…" action="/search" articleBasePath="/article" />
      </div>

      {/* Popular destinations */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {POPULAR.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="font-display text-sm uppercase tracking-label px-3 py-2 border border-gold/40 text-ink dark:text-parchment hover:border-gold hover:text-gold transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Browse by category */}
      <div className="pt-6 border-t border-gold/25">
        <p className="eyebrow block mb-3">Browse by category</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {CATEGORIES.map(({ label, slug }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="text-sm text-ink-2 dark:text-parchment/70 hover:text-gold transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      <div className="inline-block bg-primary text-white text-sm font-semibold px-3 py-1 mb-6 uppercase tracking-widest">
        404
      </div>
      <h1 className="text-4xl font-semibold mb-4">Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        The article or page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try searching, or jump to one of our popular sections below.
      </p>

      {/* Search box for recovery */}
      <div className="max-w-md mx-auto mb-8 [&_input]:!text-gray-900 [&_input]:!bg-white">
        <SearchInput placeholder="Search manga & anime news…" action="/search" articleBasePath="/article" />
      </div>

      {/* Popular destinations */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {POPULAR.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-xs font-bold uppercase tracking-wider px-3 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Browse by category */}
      <div className="pt-6 border-t border-site-border">
        <p className="text-2xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Browse by category</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {CATEGORIES.map(({ label, slug }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

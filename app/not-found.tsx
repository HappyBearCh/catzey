import Link from 'next/link';
import type { Metadata } from 'next';
import { SearchInput } from '@/components/SearchInput';
import { CATEGORIES } from '@/lib/types';
import { GROUP_NUMBERS, getGroup } from '@/lib/number-groups';
import { reduce } from '@/lib/numerology';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

const POPULAR = [
  { label: 'Home', href: '/' },
  { label: 'The Shelves', href: '/numbers' },
  { label: 'Numbered Sets', href: '/sets' },
  { label: 'Learn', href: '/learn' },
  { label: 'Glossary', href: '/glossary' },
];

// Computed rather than typed, like every other figure on the site.
const STATUS = 404;
const STATUS_VALUE = reduce(STATUS);

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="sigil w-16 h-16 text-2xl mb-6">
        404
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4 text-ink dark:text-parchment">Page Not Found</h1>
      <p className="eyebrow mb-5">
        404 reduces to {STATUS_VALUE} · {getGroup(STATUS_VALUE).shelf}
      </p>
      <p className="text-ink-2 dark:text-parchment/70 mb-8 max-w-md mx-auto leading-relaxed">
        The page you were looking for does not exist or has moved. For what it is worth, 404
        reduces to {STATUS_VALUE} — {getGroup(STATUS_VALUE).tagline} — which is a fair description
        of a missing page: something was counted, and it came up short. Try searching, or take one
        of the shelves below.
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

      {/* Browse by shelf — the way the reference is actually arranged. */}
      <div className="pt-6 border-t border-gold/25 mb-6">
        <p className="eyebrow block mb-3">Or browse by number</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {GROUP_NUMBERS.map((n) => (
            <Link
              key={n}
              href={`/number/${n}`}
              title={getGroup(n).shelf}
              className="sigil w-8 h-8 text-xs border border-gold/30 hover:border-gold hover:text-gold transition-colors"
            >
              {n}
            </Link>
          ))}
        </div>
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

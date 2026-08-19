import Link from 'next/link';
import { CategoryNav } from './CategoryNav';
import { ThemeToggle } from './ThemeToggle';
import { SearchInput } from './SearchInput';
import { MobileMenu } from './MobileMenu';

// A masthead, not a news bar. The old header was a dark violet block with a
// drop shadow and a row of category tabs — the standard tabloid furniture.
// This one is the top of a printed page: centred wordmark, rules above and
// below, and the navigation set small in caps.
export function Header() {
  return (
    <header className="bg-paper dark:bg-ink-bg border-b border-rule dark:border-ink-border">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-4 md:py-6">
          {/* Left: menu on mobile, date line on desktop */}
          <div className="flex-1 flex items-center min-w-0">
            <MobileMenu />
            <p className="hidden md:block eyebrow">A reference for manga</p>
          </div>

          {/* Centre: the wordmark */}
          <Link href="/" className="group flex-shrink-0 text-center">
            <span className="block font-serif text-3xl md:text-4xl font-semibold tracking-tight text-ink dark:text-paper-2 group-hover:text-seal transition-colors">
              Catzye
            </span>
            <span className="mt-0.5 block eyebrow">Est. 2024</span>
          </Link>

          {/* Right: search and theme */}
          <div className="flex-1 flex items-center justify-end gap-3">
            <a
              href="/search"
              className="md:hidden text-ink-muted hover:text-seal transition-colors"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </a>
            <div className="hidden md:block w-56">
              <SearchInput placeholder="Search the reference…" action="/search" articleBasePath="/article" />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <CategoryNav />
    </header>
  );
}

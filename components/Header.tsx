import Link from 'next/link';
import { Logo } from './Logo';
import { CategoryNav } from './CategoryNav';
import { ThemeToggle } from './ThemeToggle';
import { SearchInput } from './SearchInput';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-site-dark">
        <div className="max-w-8xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Hamburger (mobile only) */}
          <MobileMenu />

          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center ml-auto">
            <SearchInput placeholder="Search…" action="/search" articleBasePath="/article" />
          </div>

          <div className="flex items-center gap-3">
            <a href="/search" className="md:hidden text-gray-400 hover:text-white transition-colors" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
              </svg>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Category nav — horizontally scrollable on mobile */}
      <CategoryNav />
    </header>
  );
}

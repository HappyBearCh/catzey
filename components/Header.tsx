import Link from 'next/link';
import { Logo } from './Logo';
import { CategoryNav } from './CategoryNav';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
export function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-site-dark">
        <div className="max-w-8xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          <form action="/search" method="get" className="hidden md:flex items-center ml-auto">
            <input
              name="q"
              placeholder="Search…"
              className="text-xs bg-white/10 text-white placeholder-gray-500 border border-white/15 rounded-sm px-3 py-1.5 w-44 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-colors"
            />
          </form>

          <div className="flex items-center gap-3">
            <a href="/search" className="md:hidden text-gray-400 hover:text-white transition-colors" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
              </svg>
            </a>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Category nav */}
      <CategoryNav />
    </header>
  );
}

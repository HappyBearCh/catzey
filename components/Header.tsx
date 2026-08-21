import Link from 'next/link';
import { CategoryNav } from './CategoryNav';
import { ThemeToggle } from './ThemeToggle';
import { SearchInput } from './SearchInput';
import { MobileMenu } from './MobileMenu';
import { getTodaysNumber } from '@/lib/numerology';

// The title plate of a book of correspondences: the wordmark between two
// ornaments, gold rules above and below, and the day's number set in the
// margin. The number is the real Universal Day figure, not decoration.
export function Header() {
  const today = getTodaysNumber();

  return (
    <header className="bg-paper dark:bg-ground border-b-2 border-ink dark:border-parchment">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-4 md:py-6">
          <div className="flex-1 flex items-center min-w-0">
            <MobileMenu />
            <div className="hidden md:flex items-baseline gap-2">
              <span className="eyebrow">Today</span>
              <span className="sigil sigil-sm">{today.number}</span>
            </div>
          </div>

          <Link href="/" className="group flex-shrink-0 text-center">
            <span className="flex items-center justify-center">
              <span className="block font-display text-4xl md:text-5xl font-black tracking-tight text-ink dark:text-parchment group-hover:text-seal transition-colors">
                Catzye
              </span>
            </span>
            {/* A vermilion bar under the wordmark, the way a cover rules off a
                title from its subtitle. */}
            <span className="mx-auto mt-1.5 mb-1.5 block h-1 w-16 bg-seal" aria-hidden="true" />
            <span className="block eyebrow">Manga, filed by number</span>
          </Link>

          <div className="flex-1 flex items-center justify-end gap-3">
            <a
              href="/search"
              className="md:hidden text-ink-muted dark:text-gold/60 hover:text-gold transition-colors"
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

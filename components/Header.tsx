import Link from 'next/link';
import { CategoryNav } from './CategoryNav';
import { ThemeToggle } from './ThemeToggle';
import { SearchInput } from './SearchInput';
import { MobileMenu } from './MobileMenu';
import { TodaySigil } from './TodaySigil';

// One quiet row: the wordmark, the five sections, then search and the theme
// switch. It stays put while the page scrolls under a translucent ground, so
// the way out of any entry is always one tap away.
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[rgb(var(--ink-line))] bg-paper/85 dark:bg-ground/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75 dark:supports-[backdrop-filter]:bg-ground/70">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center gap-4">
        <MobileMenu />

        <Link href="/" className="group flex items-center gap-2 shrink-0" aria-label="Catzye, home">
          <span className="block w-2.5 h-2.5 rounded-full bg-seal" aria-hidden="true" />
          <span className="font-display text-xl md:text-[1.4rem] font-black tracking-tight text-ink dark:text-parchment group-hover:text-seal transition-colors">
            Catzye
          </span>
        </Link>

        <CategoryNav />

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <div className="hidden lg:block w-56">
            <SearchInput placeholder="Search…" action="/search" articleBasePath="/article" />
          </div>
          <TodaySigil />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

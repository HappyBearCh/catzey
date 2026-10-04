'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isActive } from './CategoryNav';

const icon = (d: string) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

// The phone's main navigation: the reference first, then search. Essays and
// the shelves are in the menu, one tap further.
const ITEMS = [
  { label: 'Home', href: '/', icon: icon('M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5') },
  { label: 'Learn', href: '/learn', icon: icon('M12 6.25v13m0-13C10.8 5.5 9.2 5 7.5 5S4.2 5.5 3 6.25v13C4.2 18.5 5.8 18 7.5 18s3.3.5 4.5 1.25m0-13C13.2 5.5 14.8 5 16.5 5s3.3.5 4.5 1.25v13C19.8 18.5 18.2 18 16.5 18s-3.3.5-4.5 1.25') },
  { label: 'Wiki', href: '/wiki', icon: icon('M4 5h16M4 10h16M4 15h10M4 20h7') },
  { label: 'Glossary', href: '/glossary', icon: icon('M7 4h10a2 2 0 0 1 2 2v14l-7-3-7 3V6a2 2 0 0 1 2-2z') },
  { label: 'Search', href: '/search', icon: icon('M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z') },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-paper dark:bg-ground border-t-2 border-ink dark:border-parchment safe-area-inset-bottom"
    >
      <ul className="flex items-center">
        {ITEMS.map(({ label, href, icon }) => {
          const active = href === '/' ? pathname === '/' : isActive(pathname, href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
                  active ? 'text-gold' : 'text-ink-muted hover:text-ink dark:text-parchment/70 dark:hover:text-parchment'
                }`}
              >
                {icon}
                <span className="text-2xs font-semibold">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { universalDayNumber } from '@/lib/numerology';

interface Props {
  basePath?: string;
}

export function BottomNav({ basePath = '' }: Props) {
  const pathname = usePathname();
  const isBosnian = basePath === '/bs';
  const homeHref = basePath || '/';

  const items = [
    {
      label: isBosnian ? 'Početna' : 'Home',
      href: homeHref,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: 'Manga',
      href: `${basePath}/manga`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    // The shelves take a tab of their own on mobile: they are the arrangement,
    // and the category tabs below are the older cross-cut.
    {
      label: isBosnian ? 'Brojevi' : 'Shelves',
      href: `${basePath}/numbers`,
      icon: (
        <span className="w-5 h-5 flex items-center justify-center font-display text-base leading-none" aria-hidden="true">
          {universalDayNumber()}
        </span>
      ),
    },
    {
      label: isBosnian ? 'Traži' : 'Search',
      href: `${basePath}/search`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      ),
    },
    {
      label: isBosnian ? 'Sačuvano' : 'Saved',
      href: `${basePath}/saved`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-paper dark:bg-ground border-t-2 border-ink dark:border-parchment border-t border-white/10 safe-area-inset-bottom">
      <ul className="flex items-center">
        {items.map(({ label, href, icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
                  active ? 'text-gold' : 'text-ink-muted hover:text-ink dark:text-parchment/55 dark:hover:text-parchment'
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

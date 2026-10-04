'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// One row, five destinations: the three parts of the reference, the essays,
// and the shelves. The essay archives (manga, anime, industry) are reached
// through Essays, and the twelve shelves through Shelves, so neither needs a
// row of its own here. On phones the bottom bar and the menu do this job, so
// the row is desktop-only rather than a strip that scrolls sideways.
export const PRIMARY_LINKS = [
  { label: 'Learn', href: '/learn' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Wiki', href: '/wiki' },
  { label: 'Essays', href: '/series' },
  { label: 'Shelves', href: '/numbers' },
] as const;

export function isActive(pathname: string, href: string): boolean {
  if (pathname === href || pathname.startsWith(`${href}/`)) return true;
  // The essay archives and the shelves belong to their tab.
  if (href === '/series') return /^\/(manga|anime|industry|article)(\/|$)/.test(pathname);
  if (href === '/numbers') return pathname.startsWith('/number/');
  if (href === '/wiki') return pathname.startsWith('/sets');
  return false;
}

export function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden md:block border-t-2 border-ink dark:border-parchment">
      <ul className="max-w-8xl mx-auto px-4 flex items-center justify-center gap-8">
        {PRIMARY_LINKS.map(({ label, href }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`block py-3 font-display text-[0.85rem] font-semibold uppercase tracking-label transition-colors ${
                  active
                    ? 'text-gold'
                    : 'text-ink-2 hover:text-gold dark:text-parchment/80 dark:hover:text-gold'
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

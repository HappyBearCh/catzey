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
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-1 ml-4">
        {PRIMARY_LINKS.map(({ label, href }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`block px-3 py-1.5 rounded-full font-sans text-[0.9rem] font-medium transition-colors ${
                  active
                    ? 'bg-ink text-paper dark:bg-parchment dark:text-ink'
                    : 'text-ink-2 hover:text-ink hover:bg-ink/5 dark:text-parchment/75 dark:hover:text-parchment dark:hover:bg-parchment/5'
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

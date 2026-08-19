'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/types';

// The educational sections lead the nav — they are what the site is for now.
// The news categories stay reachable behind them while the archive is live,
// but they are set smaller and quieter so the hierarchy is unambiguous.
const LEARN_LINKS = [
  { label: 'Learn', href: '/learn' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Wiki', href: '/wiki' },
];

const linkBase =
  'block py-2.5 font-sans text-[0.7rem] uppercase tracking-label transition-colors';

export function CategoryNav() {
  const pathname = usePathname();
  const homeActive = pathname === '/';

  return (
    <nav className="border-t border-rule dark:border-ink-border overflow-x-auto">
      <div className="max-w-8xl mx-auto px-4">
        <ul className="flex items-center justify-center gap-5 md:gap-7 whitespace-nowrap">
          <li>
            <Link
              href="/"
              aria-current={homeActive ? 'page' : undefined}
              className={`${linkBase} font-semibold ${
                homeActive
                  ? 'text-seal'
                  : 'text-ink-2 hover:text-seal dark:text-paper-2/80 dark:hover:text-seal'
              }`}
            >
              Home
            </Link>
          </li>

          {LEARN_LINKS.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`${linkBase} font-semibold ${
                    active
                      ? 'text-seal'
                      : 'text-ink-2 hover:text-seal dark:text-paper-2/80 dark:hover:text-seal'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}

          <li aria-hidden="true" className="text-rule-strong dark:text-ink-border select-none">
            ·
          </li>

          {CATEGORIES.map(({ label, slug }) => {
            const href = `/${slug}`;
            const active = pathname === href;
            return (
              <li key={slug}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`${linkBase} ${
                    active
                      ? 'text-seal'
                      : 'text-ink-muted hover:text-ink dark:text-paper-2/50 dark:hover:text-paper-2'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

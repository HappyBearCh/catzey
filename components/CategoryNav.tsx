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
  'block py-2.5 font-display text-[0.82rem] uppercase tracking-label transition-colors';

// Roman numerals mark the three parts of the reference, as the sections of a
// treatise are numbered rather than tabbed.
const NUMERALS = ['Ⅰ', 'Ⅱ', 'Ⅲ'];

export function CategoryNav() {
  const pathname = usePathname();
  const homeActive = pathname === '/';

  return (
    <nav className="border-t border-gold/20 overflow-x-auto">
      <div className="max-w-8xl mx-auto px-4">
        <ul className="flex items-center justify-center gap-5 md:gap-7 whitespace-nowrap">
          <li>
            <Link
              href="/"
              aria-current={homeActive ? 'page' : undefined}
              className={`${linkBase} font-semibold ${
                homeActive
                  ? 'text-gold'
                  : 'text-ink-2 hover:text-gold dark:text-parchment/75 dark:hover:text-gold'
              }`}
            >
              Home
            </Link>
          </li>

          {LEARN_LINKS.map(({ label, href }, i) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`${linkBase} font-semibold ${
                    active
                      ? 'text-gold'
                      : 'text-ink-2 hover:text-gold dark:text-parchment/75 dark:hover:text-gold'
                  }`}
                >
                  <span className="text-gold/50 mr-1.5" aria-hidden="true">{NUMERALS[i]}</span>
                  {label}
                </Link>
              </li>
            );
          })}

          <li aria-hidden="true" className="text-gold/40 select-none text-xs">
            ⁘
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
                      ? 'text-gold'
                      : 'text-ink-muted hover:text-ink dark:text-parchment/45 dark:hover:text-parchment'
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

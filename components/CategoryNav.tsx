'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/types';
import { GROUP_NUMBERS, getGroup } from '@/lib/number-groups';

// The educational sections lead the nav — they are what the site is for now.
// The news categories stay reachable behind them while the archive is live,
// but they are set smaller and quieter so the hierarchy is unambiguous.
const LEARN_LINKS = [
  { label: 'Learn', href: '/learn' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Wiki', href: '/wiki' },
  { label: 'Sets', href: '/sets' },
  { label: 'Shelves', href: '/numbers' },
];

const linkBase =
  'block py-2.5 font-display text-[0.82rem] uppercase tracking-label transition-colors';

// The parts of the reference are numbered, as the chapters of a study guide
// are. Arabic rather than roman: this is a site about arithmetic.
const NUMERALS = ['1', '2', '3', '4', '5'];

export function CategoryNav() {
  const pathname = usePathname();
  const homeActive = pathname === '/';

  return (
    <nav className="border-t-2 border-ink dark:border-parchment overflow-x-auto">
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
                  <span className="text-seal mr-1.5 font-bold" aria-hidden="true">{NUMERALS[i]}</span>
                  {label}
                </Link>
              </li>
            );
          })}

          <li aria-hidden="true" className="select-none">
            <span className="block w-px h-4 bg-ink/25 dark:bg-parchment/25" />
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

      {/* The shelves themselves, as twelve figures. Categories say what a text
          is about; these say what it reduces to, which is how the reference is
          actually arranged — so they get a rule of their own. */}
      <div className="border-t border-ink/20 dark:border-parchment/20 bg-paper-2 dark:bg-ground-2">
        <div className="max-w-8xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-1 md:gap-1.5 py-1.5 whitespace-nowrap">
            <li className="eyebrow text-ink-muted dark:text-parchment/40 pr-2 hidden sm:block">
              Filed by number
            </li>
            {GROUP_NUMBERS.map((n) => {
              const href = `/number/${n}`;
              const active = pathname === href;
              return (
                <li key={n}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    title={`${n} — ${getGroup(n).shelf}`}
                    className={`sigil sigil-sm transition-colors ${
                      active
                        ? 'border-seal bg-seal text-white'
                        : 'border-ink dark:border-parchment text-ink-muted hover:border-seal hover:text-gold dark:text-parchment/50'
                    }`}
                  >
                    {n}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

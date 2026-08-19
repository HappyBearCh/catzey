'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/types';

// The educational sections lead the nav — they are what the site is for now.
// The news categories stay reachable behind them while the archive is live.
const LEARN_LINKS = [
  { label: 'Learn', href: '/learn' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Wiki', href: '/wiki' },
];

export function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-site-dark border-b border-white/10 overflow-x-auto">
      <div className="max-w-8xl mx-auto px-4">
        <ul className="flex items-center gap-0 whitespace-nowrap">
          <li>
            <Link
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className={`block px-3 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                pathname === '/'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
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
                  className={`block px-3 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                    active
                      ? 'text-white border-b-2 border-primary'
                      : 'text-primary hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li aria-hidden="true" className="px-1 text-white/20 select-none">|</li>
          {CATEGORIES.map(({ label, slug }) => {
            const href = `/${slug}`;
            const active = pathname === href;
            return (
              <li key={slug}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`block px-3 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    active
                      ? 'text-white border-b-2 border-primary'
                      : 'text-gray-400 hover:text-white'
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

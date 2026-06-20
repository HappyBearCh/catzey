'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/types';

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

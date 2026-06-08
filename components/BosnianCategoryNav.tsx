'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/types';

export function BosnianCategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-site-dark border-b border-white/10 overflow-x-auto">
      <div className="max-w-8xl mx-auto px-4">
        <ul className="flex items-center gap-0 whitespace-nowrap">
          <li>
            <Link
              href="/bs"
              className={`block px-3 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                pathname === '/bs'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Početna
            </Link>
          </li>
          {CATEGORIES.map(({ labelBs, slug }) => {
            const href = `/bs/${slug}`;
            const active = pathname === href;
            return (
              <li key={slug}>
                <Link
                  href={href}
                  className={`block px-3 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    active
                      ? 'text-white border-b-2 border-primary'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {labelBs}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

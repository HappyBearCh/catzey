'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/types';
import { GROUP_NUMBERS, getGroup } from '@/lib/number-groups';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 text-ink-2 hover:text-gold dark:text-parchment/70 transition-colors"
      >
        <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-site-dark flex flex-col transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-white/10 flex-shrink-0">
          <span className="text-white font-semibold text-sm uppercase tracking-widest">Menu</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-ink-muted hover:text-gold dark:text-gold/60 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3">
          <Link
            href="/"
            className={`flex items-center gap-3 px-5 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors ${
              pathname === '/' ? 'text-white bg-white/5 border-l-2 border-primary' : 'text-ink-muted hover:text-gold dark:text-gold/60 hover:bg-white/5'
            }`}
          >
            Home
          </Link>
          {/* The reference proper, then the twelve shelves it is filed on,
              then the news categories — the same hierarchy as the desktop nav. */}
          {[
            { label: 'Learn', href: '/learn' },
            { label: 'Glossary', href: '/glossary' },
            { label: 'Wiki', href: '/wiki' },
            { label: 'Sets', href: '/sets' },
            { label: 'Shelves', href: '/numbers' },
          ].map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-5 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors ${
                  active ? 'text-white bg-white/5 border-l-2 border-primary' : 'text-ink-muted hover:text-gold dark:text-gold/60 hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            );
          })}

          <div className="mx-5 my-2 border-t border-white/10" />
          <p className="px-5 pb-2 text-2xs uppercase tracking-widest text-gold/60">Filed by number</p>
          <div className="px-5 pb-3 grid grid-cols-4 gap-1.5">
            {GROUP_NUMBERS.map((n) => (
              <Link
                key={n}
                href={`/number/${n}`}
                title={`${n} — ${getGroup(n).shelf}`}
                className={`flex items-center justify-center h-9 border text-sm font-display transition-colors ${
                  pathname === `/number/${n}`
                    ? 'border-gold bg-gold/15 text-gold'
                    : 'border-gold/25 text-gold/70 hover:border-gold hover:text-gold'
                }`}
              >
                {n}
              </Link>
            ))}
          </div>

          <div className="mx-5 my-2 border-t border-white/10" />
          {CATEGORIES.map(({ label, slug }) => {
            const active = pathname === `/${slug}`;
            return (
              <Link
                key={slug}
                href={`/${slug}`}
                className={`flex items-center gap-3 px-5 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors ${
                  active ? 'text-white bg-white/5 border-l-2 border-primary' : 'text-ink-muted hover:text-gold dark:text-gold/60 hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div className="px-5 py-4 border-t border-white/10 flex-shrink-0">
          <Link href="/feed.xml" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            RSS Feed
          </Link>
        </div>
      </div>
    </>
  );
}

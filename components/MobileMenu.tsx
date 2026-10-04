'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_LINKS, isActive } from './CategoryNav';

// Everything the bottom bar does not have room for, in one plain list: the
// main sections first, then the smaller corners of the site.
const MORE_LINKS = [
  { label: 'Numbered sets', href: '/sets' },
  { label: 'Guides', href: '/guides' },
  { label: 'Saved', href: '/saved' },
  { label: 'About', href: '/about' },
];

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

  const item = (label: string, href: string) => {
    const active = isActive(pathname, href);
    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? 'page' : undefined}
        className={`block px-5 py-3 font-display text-lg transition-colors ${
          active
            ? 'text-gold border-l-2 border-gold'
            : 'text-ink dark:text-parchment border-l-2 border-transparent hover:text-gold'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 text-ink-2 hover:text-gold dark:text-parchment/80 transition-colors"
      >
        <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />
      )}

      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-paper dark:bg-ground border-r-2 border-ink dark:border-parchment flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-rule/25 dark:border-rule flex-shrink-0">
          <span className="eyebrow">Menu</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-ink-muted hover:text-gold dark:text-parchment/70 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Menu" className="flex-1 overflow-y-auto py-3">
          {item('Home', '/')}
          {PRIMARY_LINKS.map(({ label, href }) => item(label, href))}
          <div className="mx-5 my-3 border-t border-rule/25 dark:border-rule" />
          {MORE_LINKS.map(({ label, href }) => item(label, href))}
        </nav>
      </div>
    </>
  );
}

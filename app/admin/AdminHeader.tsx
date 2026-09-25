'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Logo } from '@/components/Logo';

export function AdminHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <header className="bg-white text-gray-900 border-b border-gray-200 shadow-sm">
      <div className="max-w-8xl mx-auto px-4">
        {/* Main row */}
        <div className="h-14 flex items-center gap-3">
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>
          <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            Admin
          </span>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/admin/series"
              className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors px-2 py-1.5"
            >
              Series
            </Link>

            {/* + New Article */}
            <Link
              href="/admin/new"
              className="bg-gray-900 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm hover:bg-gray-700 transition-colors"
            >
              <span className="hidden sm:inline">+ New Article</span>
              <span className="sm:hidden">+</span>
            </Link>

            {/* Desktop: View Site + Logout inline */}
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline text-xs text-gray-500 hover:text-gray-900 transition-colors"
            >
              View Site ↗
            </Link>
            <button
              onClick={handleLogout}
              className="hidden md:inline text-xs text-gray-500 hover:text-gray-900 transition-colors"
            >
              Logout
            </button>

            {/* Mobile: hamburger for View Site + Logout */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3 flex flex-col gap-3 pb-4">
            <Link
              href="/"
              target="_blank"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              View Site ↗
            </Link>
            <button
              onClick={handleLogout}
              className="text-left text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

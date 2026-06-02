'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Logo } from '@/components/Logo';

export function AdminHeader() {
  const router = useRouter();
  const [scraping, setScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<string | null>(null);
  const [scrapeErrors, setScrapeErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleScrape() {
    setScraping(true);
    setScrapeResult(null);
    setScrapeErrors([]);
    setShowErrors(false);
    setMenuOpen(false);
    try {
      const res = await fetch('/api/cron/scrape', {
        headers: { Authorization: `Bearer ${prompt('Enter CRON_SECRET:') ?? ''}` },
      });
      const raw = await res.text();
      let data: Record<string, unknown>;
      try {
        data = JSON.parse(raw);
      } catch {
        setScrapeResult('Scrape failed (non-JSON response)');
        setScrapeErrors([`HTTP ${res.status} — raw response: ${raw.slice(0, 500)}`]);
        return;
      }
      const errors: string[] = (data.errors as string[]) ?? [];
      setScrapeErrors(errors);
      setScrapeResult(`+${data.added} · skip ${data.skipped} · err ${errors.length}`);
      router.refresh();
    } catch (e) {
      setScrapeResult('Scrape failed');
      setScrapeErrors([String(e)]);
    } finally {
      setScraping(false);
    }
  }

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
            {/* Scrape result — hidden on very small screens */}
            {scrapeResult && (
              <div className="hidden sm:block relative">
                <button
                  onClick={() => setShowErrors((v) => !v)}
                  className={`text-xs font-semibold ${scrapeErrors.length > 0 ? 'text-red-600 hover:text-red-700' : 'text-green-600'}`}
                >
                  {scrapeResult}
                </button>
                {showErrors && scrapeErrors.length > 0 && (
                  <div className="absolute right-0 top-6 z-50 w-[520px] bg-white border border-gray-200 rounded shadow-xl p-3 max-h-80 overflow-y-auto">
                    <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-wider">Scraper errors</p>
                    {scrapeErrors.map((e, i) => (
                      <p key={i} className="text-xs text-red-600 mb-1 font-mono break-all">{e}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* + New Article */}
            <Link
              href="/admin/new"
              className="bg-gray-900 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm hover:bg-gray-700 transition-colors"
            >
              <span className="hidden sm:inline">+ New Article</span>
              <span className="sm:hidden">+</span>
            </Link>

            {/* Run Scraper */}
            <button
              onClick={handleScrape}
              disabled={scraping}
              className="bg-primary hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-sm transition-colors disabled:opacity-60 flex items-center gap-1.5"
            >
              {scraping ? (
                <>
                  <span className="animate-spin inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full" />
                  <span className="hidden sm:inline">Scraping…</span>
                </>
              ) : (
                <>
                  <span>↻</span>
                  <span className="hidden sm:inline">Run Scraper</span>
                </>
              )}
            </button>

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
            {scrapeResult && (
              <span className="text-xs text-green-600 font-semibold">{scrapeResult}</span>
            )}
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

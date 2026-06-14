'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getCategoryLabel } from '@/lib/types';

interface Suggestion {
  slug: string;
  title: string;
  category: string;
}

interface Props {
  placeholder?: string;
  action?: string;
  articleBasePath?: string;
}

const STORAGE_KEY = 'catzye-recent-searches';
const MAX_RECENT = 5;

function loadRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveRecent(query: string) {
  try {
    const prev = loadRecent();
    const updated = [query, ...prev.filter((s) => s !== query)].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

export function SearchInput({
  placeholder = 'Search…',
  action = '/search',
  articleBasePath = '/article',
}: Props) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(loadRecent());
  }, []);

  // `/` key focuses search
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Close on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const fetchSuggestions = useCallback(async (val: string) => {
    const res = await fetch(`/api/search-suggest?q=${encodeURIComponent(val)}`);
    if (res.ok) {
      const data = await res.json();
      setSuggestions(data.results ?? []);
      setOpen((data.results ?? []).length > 0);
    }
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    if (timer.current) clearTimeout(timer.current);
    if (val.trim().length < 2) {
      setSuggestions([]);
      setOpen(recentSearches.length > 0);
      return;
    }
    timer.current = setTimeout(() => fetchSuggestions(val), 220);
  }

  function onFocus() {
    if (!query && recentSearches.length > 0) setOpen(true);
    else if (suggestions.length > 0) setOpen(true);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false);
  }

  function onSubmit() {
    if (query.trim().length >= 2) {
      saveRecent(query.trim());
      setRecentSearches(loadRecent());
    }
    setOpen(false);
  }

  function selectRecent(term: string) {
    setQuery(term);
    setOpen(false);
    window.location.href = `${action}?q=${encodeURIComponent(term)}`;
  }

  function clearRecent() {
    localStorage.removeItem(STORAGE_KEY);
    setRecentSearches([]);
    setOpen(false);
  }

  function clear() {
    setOpen(false);
    setQuery('');
    setSuggestions([]);
  }

  const showRecent = !query && recentSearches.length > 0;
  const showSuggestions = !!query && suggestions.length > 0;

  return (
    <div ref={containerRef} className="relative">
      <form action={action} method="get" onSubmit={onSubmit}>
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            name="q"
            value={query}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            placeholder={placeholder}
            autoComplete="off"
            className="text-xs bg-white/10 text-white placeholder-gray-400 border border-white/15 rounded-sm px-3 py-1.5 w-64 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-colors pr-10"
          />
          <kbd className="pointer-events-none absolute right-3 text-2xs text-gray-500 font-mono hidden md:block">/</kbd>
        </div>
      </form>

      {open && (showRecent || showSuggestions) && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-900 border border-site-border dark:border-gray-700 shadow-xl z-50 max-h-72 overflow-y-auto">
          {showRecent && (
            <>
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-site-border dark:border-gray-700">
                <span className="text-2xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Recent</span>
                <button
                  type="button"
                  onClick={clearRecent}
                  className="text-2xs text-gray-400 hover:text-primary transition-colors"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => selectRecent(term)}
                  className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-site-light dark:hover:bg-gray-800 transition-colors border-b border-site-border dark:border-gray-700 last:border-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-gray-700 dark:text-gray-300">{term}</span>
                </button>
              ))}
            </>
          )}
          {showSuggestions && suggestions.map((s) => (
            <Link
              key={s.slug}
              href={`${articleBasePath}/${s.slug}`}
              onClick={() => { saveRecent(query.trim()); setRecentSearches(loadRecent()); clear(); }}
              className="flex flex-col px-3 py-2.5 hover:bg-site-light dark:hover:bg-gray-800 transition-colors border-b border-site-border dark:border-gray-700 last:border-0"
            >
              <span className="text-2xs font-black uppercase tracking-widest text-primary mb-0.5">
                {getCategoryLabel(s.category)}
              </span>
              <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug">
                {s.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

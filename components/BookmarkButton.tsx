'use client';

import { useEffect, useState } from 'react';

export interface SavedArticle {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  category: string;
  publishedAt: string;
}

const KEY = 'Catzye_saved';

function getAll(): SavedArticle[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function BookmarkButton({ article }: { article: SavedArticle }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(getAll().some((a) => a.slug === article.slug));
  }, [article.slug]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const all = getAll();
    const exists = all.some((a) => a.slug === article.slug);
    const next = exists ? all.filter((a) => a.slug !== article.slug) : [article, ...all].slice(0, 100);
    localStorage.setItem(KEY, JSON.stringify(next));
    setSaved(!exists);
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? 'Remove bookmark' : 'Bookmark article'}
      title={saved ? 'Remove bookmark' : 'Save for later'}
      className={`p-1 transition-colors ${saved ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
  );
}

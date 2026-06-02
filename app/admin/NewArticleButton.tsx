'use client';

import Link from 'next/link';

export function NewArticleButton() {
  return (
    <Link
      href="/admin/new"
      className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm hover:bg-red-700 transition-colors"
    >
      <span className="text-base leading-none">+</span>
      New Article
    </Link>
  );
}

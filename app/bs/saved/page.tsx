'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { getCategoryLabelBs } from '@/lib/types';
import type { SavedArticle } from '@/components/BookmarkButton';

const KEY = 'Catzye_saved';

export default function BosnianSavedPage() {
  const [articles, setArticles] = useState<SavedArticle[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setArticles(JSON.parse(localStorage.getItem(KEY) ?? '[]'));
    } catch {
      setArticles([]);
    }
    setReady(true);
  }, []);

  function remove(slug: string) {
    const next = articles.filter((a) => a.slug !== slug);
    setArticles(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  if (!ready) return null;

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="block w-1 h-8 bg-primary" />
        <h1 className="text-3xl font-black uppercase tracking-tight">Sačuvani članci</h1>
      </div>
      <p className="text-site-gray text-sm mb-8 ml-4">
        {articles.length} sačuvan{articles.length === 1 ? '' : 'ih'}
      </p>

      {articles.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <p className="text-xl font-bold mb-2">Nema sačuvanih članaka</p>
          <p className="text-sm mb-6">Bookmarkirajte članke za čitanje.</p>
          <Link href="/bs" className="text-primary hover:underline text-sm font-semibold">Pregledaj vijesti →</Link>
        </div>
      ) : (
        <div className="divide-y divide-site-border">
          {articles.map((article) => (
            <div key={article.slug} className="flex gap-4 py-4 items-start">
              {article.imageUrl && (
                <Link href={`/bs/article/${article.slug}`} className="flex-shrink-0">
                  <div className="relative w-24 h-16 overflow-hidden rounded-sm">
                    <Image src={article.imageUrl} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                </Link>
              )}
              <div className="flex-1 min-w-0">
                <span className="text-2xs font-bold uppercase tracking-widest text-primary block mb-0.5">
                  {getCategoryLabelBs(article.category)}
                </span>
                <Link href={`/bs/article/${article.slug}`}>
                  <h2 className="font-bold text-base leading-snug hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                </Link>
                <time className="text-xs text-gray-400 mt-1 block">
                  {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                </time>
              </div>
              <button onClick={() => remove(article.slug)} className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

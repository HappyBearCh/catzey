'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { getCategoryLabel } from '@/lib/types';

interface ArticleSnippet {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  category: string;
  publishedAt: string;
}

interface Props {
  initialSkip: number;
  basePath?: string;
}

export function LoadMoreArticles({ initialSkip, basePath = '' }: Props) {
  const [articles, setArticles] = useState<ArticleSnippet[]>([]);
  const [skip, setSkip] = useState(initialSkip);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles?limit=12&page=${Math.floor(skip / 12) + 1}`);
      const data = await res.json();
      const newArticles: ArticleSnippet[] = data.articles ?? [];
      setArticles((prev) => [...prev, ...newArticles]);
      setSkip((s) => s + newArticles.length);
      if (newArticles.length < 12) setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {articles.length > 0 && (
        <section className="my-8 border-t border-site-border pt-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-1 h-6 bg-primary" />
            <h2 className="text-lg font-black uppercase tracking-wide">
              {basePath === '/bs' ? 'Više vijesti' : 'More Stories'}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {articles.map((article) => (
              <Link key={article.id} href={`${basePath}/article/${article.slug}`} className="group flex flex-col">
                {article.imageUrl ? (
                  <div className="relative overflow-hidden aspect-video mb-2">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-video mb-2 bg-black flex items-center justify-center">
                    <span className="text-primary text-2xs font-black uppercase tracking-widest">
                      {getCategoryLabel(article.category)}
                    </span>
                  </div>
                )}
                <span className="text-2xs font-bold uppercase tracking-widest text-primary mb-1">
                  {getCategoryLabel(article.category)}
                </span>
                <h3 className="font-bold text-base leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <time className="text-xs text-gray-400 mt-auto pt-1">
                  {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                </time>
              </Link>
            ))}
          </div>
        </section>
      )}

      {hasMore && (
        <div className="flex justify-center mt-8 mb-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 text-sm font-bold uppercase tracking-wider border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
          >
            {loading
              ? (basePath === '/bs' ? 'Učitavanje…' : 'Loading…')
              : (basePath === '/bs' ? 'Učitaj više vijesti' : 'Load More Stories')}
          </button>
        </div>
      )}
    </div>
  );
}

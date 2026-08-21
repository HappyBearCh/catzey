'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { getCategoryLabel } from '@/lib/types';
import { titleValue } from '@/lib/number-groups';

const BLUR_DATA_URL = 'data:image/gif;base64,R0lGODlhAQABAPAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

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

function SkeletonCard() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="aspect-video mb-2 bg-gray-200 dark:bg-gray-700" />
      <div className="flex items-center gap-1.5 mb-2">
        <div className="h-2.5 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-2.5 w-2.5 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
      <div className="h-2.5 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
    </div>
  );
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
            <h2 className="text-lg font-semibold uppercase tracking-wide">
              {basePath === '/bs' ? 'Više vijesti' : 'More Stories'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {articles.map((article) => (
              <Link key={article.id} href={`${basePath}/article/${article.slug}`} className="group flex flex-col">
                {article.imageUrl ? (
                  <div className="relative overflow-hidden aspect-video mb-2 bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </div>
                ) : (
                  <div className="aspect-video mb-2 bg-black flex items-center justify-center">
                    <span className="text-primary text-2xs font-semibold uppercase tracking-widest">
                      {getCategoryLabel(article.category)}
                      <span className="text-gold/70 font-normal"> · {titleValue(article.title)}</span>
                    </span>
                  </div>
                )}
                <span className="text-2xs font-bold uppercase tracking-widest text-primary mb-1">
                  {getCategoryLabel(article.category)}
                  <span className="text-gold/70 font-normal"> · {titleValue(article.title)}</span>
                </span>
                <h3 className="font-bold text-base leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <time className="text-xs text-gray-600 dark:text-gray-300 mt-auto pt-1">
                  {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                </time>
              </Link>
            ))}
          </div>
        </section>
      )}

      {loading && (
        <section className="my-8 border-t border-site-border pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </section>
      )}

      {hasMore && !loading && (
        <div className="flex justify-center mt-8 mb-4">
          <button
            onClick={loadMore}
            className="px-8 py-3 text-sm font-bold uppercase tracking-wider border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            {basePath === '/bs' ? 'Učitaj više vijesti' : 'Load More Stories'}
          </button>
        </div>
      )}
    </div>
  );
}

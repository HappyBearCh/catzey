import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { searchArticles } from '@/lib/search';
import { getCategoryLabel } from '@/lib/types';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export function generateMetadata(): Metadata {
  return { title: 'Search' };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams;
  const results = q.trim().length >= 2 ? await searchArticles(q, 'en') : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black mb-6">Search</h1>

      <form method="get" action="/search" className="mb-8">
        <div className="flex gap-2">
          <input
            name="q"
            defaultValue={q}
            autoFocus
            placeholder="Search articles…"
            className="flex-1 border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white font-bold text-sm px-5 py-2.5 rounded-sm hover:bg-red-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {q.trim().length >= 2 && (
        <p className="text-sm text-gray-500 mb-6">
          {results.length === 0
            ? `No results for "${q}"`
            : `${results.length} result${results.length !== 1 ? 's' : ''} for "${q}"`}
        </p>
      )}

      <div className="divide-y divide-gray-100">
        {results.map((a) => (
          <article key={a.id} className="py-4 flex gap-4">
            {a.imageUrl && (
              <img
                src={a.imageUrl}
                alt=""
                className="w-20 h-14 object-cover rounded-sm flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <span className="text-2xs font-bold uppercase tracking-wider text-primary">
                {getCategoryLabel(a.category)}
              </span>
              <h2 className="font-bold text-sm leading-snug mt-0.5">
                <Link href={`/article/${a.slug}`} className="hover:text-primary transition-colors">
                  {a.title}
                </Link>
              </h2>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{a.excerpt}</p>
              <p className="text-2xs text-gray-400 mt-1">
                {formatDistanceToNow(new Date(a.publishedAt), { addSuffix: true })}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

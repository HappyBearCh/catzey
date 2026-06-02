import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { searchArticles } from '@/lib/search';
import { getCategoryLabelBs } from '@/lib/types';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export function generateMetadata(): Metadata {
  return { title: 'Pretraga' };
}

export default async function BosnianSearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams;
  const results = q.trim().length >= 2 ? await searchArticles(q, 'bs') : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black mb-6">Pretraga</h1>

      <form method="get" action="/bs/search" className="mb-8">
        <div className="flex gap-2">
          <input
            name="q"
            defaultValue={q}
            autoFocus
            placeholder="Pretražite članke…"
            className="flex-1 border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white font-bold text-sm px-5 py-2.5 rounded-sm hover:bg-red-700 transition-colors"
          >
            Pretraži
          </button>
        </div>
      </form>

      {q.trim().length >= 2 && (
        <p className="text-sm text-gray-500 mb-6">
          {results.length === 0
            ? `Nema rezultata za "${q}"`
            : `${results.length} rezultat${results.length !== 1 ? 'a' : ''} za "${q}"`}
        </p>
      )}

      <div className="divide-y divide-gray-100">
        {results.map((a) => {
          const title = a.titleBs || a.title;
          const excerpt = a.excerptBs || a.excerpt;
          return (
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
                  {getCategoryLabelBs(a.category)}
                </span>
                <h2 className="font-bold text-sm leading-snug mt-0.5">
                  <Link href={`/bs/article/${a.slug}`} className="hover:text-primary transition-colors">
                    {title}
                  </Link>
                </h2>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{excerpt}</p>
                <p className="text-2xs text-gray-400 mt-1">
                  {formatDistanceToNow(new Date(a.publishedAt), { addSuffix: true })}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

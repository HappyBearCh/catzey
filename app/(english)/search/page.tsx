import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { searchArticles } from '@/lib/search';
import { getCategoryLabel } from '@/lib/types';
import { GROUP_NUMBERS, getGroup, titleValue, parseGroupParam } from '@/lib/number-groups';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export function generateMetadata(): Metadata {
  return {
    title: 'Search',
    robots: { index: false, follow: false },
  };
}

/** A bare group number, or a shelf's name with or without its article. */
function matchShelf(q: string): number | null {
  const query = q.trim().toLowerCase();
  if (!query) return null;
  const asNumber = parseGroupParam(query);
  if (asNumber) return asNumber;
  const named = GROUP_NUMBERS.find((n) => {
    const shelf = getGroup(n).shelf.toLowerCase();
    return shelf === query || shelf.replace(/^the /, '') === query;
  });
  return named ?? null;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams;
  const results = q.trim().length >= 2 ? await searchArticles(q) : [];

  // A query is often a shelf rather than a word: "7", "the ledger", "ledger".
  // Word search cannot answer that, so the shelf is offered above the results
  // instead of being buried in them.
  const shelfMatch = matchShelf(q);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Search</h1>

      <form method="get" action="/search" className="mb-8">
        <div className="flex gap-2">
          <input
            name="q"
            defaultValue={q}
            autoFocus
            placeholder="Search the reference, or a number…"
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

      {shelfMatch !== null && (
        <Link
          href={`/number/${shelfMatch}`}
          className="group flex items-center gap-4 border border-gold/40 p-4 mb-8 hover:bg-gold/5 transition-colors"
        >
          <span className="sigil w-12 h-12 text-xl border border-gold/40 shrink-0">{shelfMatch}</span>
          <span className="min-w-0">
            <span className="eyebrow block">Shelf</span>
            <span className="block font-display text-xl text-ink dark:text-parchment group-hover:text-gold transition-colors">
              {getGroup(shelfMatch).shelf}
            </span>
            <span className="block text-sm text-ink-muted dark:text-parchment/55">
              {getGroup(shelfMatch).tagline}
            </span>
          </span>
        </Link>
      )}

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
              <span className="flex items-center gap-2">
                <span className="text-2xs font-bold uppercase tracking-wider text-primary">
                  {getCategoryLabel(a.category)}
                </span>
                <Link
                  href={`/number/${titleValue(a.title)}`}
                  className="text-2xs font-bold uppercase tracking-wider text-gold hover:underline"
                >
                  {titleValue(a.title)} · {getGroup(titleValue(a.title)).shelf}
                </Link>
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

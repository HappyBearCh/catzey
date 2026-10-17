import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import type { Article } from '@/lib/types';
import { getCategoryLabel } from '@/lib/types';
import { titleValue } from '@/lib/number-groups';

interface Props {
  articles: Article[];
}

const BLUR_DATA_URL = 'data:image/gif;base64,R0lGODlhAQABAPAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

export function InlineRelated({ articles }: Props) {
  if (articles.length < 2) return null;

  return (
    <div className="my-8 not-prose">
      <span className="eyebrow block mb-3">Read next</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {articles.slice(0, 2).map((article) => {
          const label = getCategoryLabel(article.category);
          return (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group flex gap-3 items-start rounded-2xl border border-line p-4 no-underline hover:border-gold/30 transition-colors"
              style={{ textDecoration: 'none' }}
            >
              {article.imageUrl ? (
                <div className="relative flex-shrink-0 w-20 h-14 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
              ) : (
                <span className="sigil sigil-md flex-shrink-0" aria-hidden="true">{titleValue(article.title)}</span>
              )}
              <div className="min-w-0">
                <span className="text-2xs font-semibold uppercase tracking-widest text-ink-muted dark:text-parchment/55 block mb-1">
                  {label}
                </span>
                <span className="block font-display font-bold text-[0.95rem] leading-snug line-clamp-2 group-hover:text-primary transition-colors text-ink dark:text-parchment">
                  {article.title}
                </span>
                <time className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                  {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                </time>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

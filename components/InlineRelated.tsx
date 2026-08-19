import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import type { Article } from '@/lib/types';
import { getCategoryLabel } from '@/lib/types';

interface Props {
  articles: Article[];
}

const BLUR_DATA_URL = 'data:image/gif;base64,R0lGODlhAQABAPAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

export function InlineRelated({ articles }: Props) {
  if (articles.length < 2) return null;

  return (
    <div className="my-8 not-prose">
      <p className="text-2xs font-semibold uppercase tracking-widest text-primary mb-3">More Stories</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-site-light dark:bg-gray-800 border-l-4 border-primary">
        {articles.slice(0, 2).map((article) => {
          const label = getCategoryLabel(article.category);
          return (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group flex gap-3 items-start"
            >
              {article.imageUrl ? (
                <div className="relative flex-shrink-0 w-20 h-14 overflow-hidden bg-gray-200 dark:bg-gray-700">
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
                <div className="flex-shrink-0 w-20 h-14 bg-black flex items-center justify-center">
                  <span className="text-primary text-2xs font-semibold uppercase">{label}</span>
                </div>
              )}
              <div className="min-w-0">
                <span className="text-2xs font-bold uppercase tracking-widest text-primary block mb-0.5">{label}</span>
                <p className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors text-gray-900 dark:text-gray-100">
                  {article.title}
                </p>
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

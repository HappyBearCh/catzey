import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import type { Article } from '@/lib/types';
import { getCategoryLabel, getCategoryLabelBs } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
  size?: 'hero' | 'large' | 'medium' | 'small';
  articleBasePath?: string;
}

function timeAgo(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

const AI_LABEL = 'Illustration';
const BLUR_DATA_URL = 'data:image/gif;base64,R0lGODlhAQABAPAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

function formatViews(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}k`;
  return v.toString();
}

function isAiImage(url: string | null | undefined) {
  return !!url?.includes('/articles/ai-');
}

function TextThumbnail({
  title,
  categoryLabel,
  className,
}: {
  title: string;
  categoryLabel: string;
  className: string;
}) {
  return (
    <div className={`${className} bg-black flex flex-col items-center justify-center p-4 text-center`}>
      <span className="text-primary text-2xs font-black uppercase tracking-widest mb-2 block">
        {categoryLabel}
      </span>
      <p className="text-white font-black leading-snug line-clamp-4 text-sm">
        {title}
      </p>
    </div>
  );
}

export function ArticleCard({ article, size = 'medium', articleBasePath = '/article' }: ArticleCardProps) {
  const isBosnian = articleBasePath.startsWith('/bs');
  const categoryLabel = isBosnian
    ? getCategoryLabelBs(article.category)
    : getCategoryLabel(article.category);
  const href = `${articleBasePath}/${article.slug}`;

  if (size === 'hero') {
    return (
      <Link href={href} className="group relative block overflow-hidden bg-black h-[480px] md:h-[540px]">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="100vw"
            className="object-cover object-top opacity-75 group-hover:opacity-65 transition-opacity duration-300"
            priority
          />
        ) : (
          <TextThumbnail title={article.title} categoryLabel={categoryLabel} className="w-full h-[540px]" />
        )}
        {isAiImage(article.imageUrl) && (
          <span className="absolute top-3 right-3 z-10 bg-black/60 text-white text-2xs italic px-2 py-0.5">
            {AI_LABEL}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="inline-block bg-primary text-white text-2xs font-bold uppercase tracking-widest px-2 py-0.5 mb-3">
            {categoryLabel}
          </span>
          <h1 className="text-white text-2xl md:text-4xl font-black leading-tight mb-3 line-clamp-3 group-hover:text-gray-200 transition-colors">
            {article.title}
          </h1>
          <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-3 hidden md:block">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-gray-600 text-xs">
            <time>{timeAgo(article.publishedAt)}</time>
          </div>
        </div>
      </Link>
    );
  }

  if (size === 'large') {
    return (
      <Link href={href} className="group flex flex-col">
        {article.imageUrl ? (
          <div className="relative overflow-hidden aspect-video mb-3 bg-gray-100 dark:bg-gray-800">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
            {isAiImage(article.imageUrl) && (
              <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-2xs italic text-center py-0.5">
                {AI_LABEL}
              </span>
            )}
          </div>
        ) : (
          <TextThumbnail title={article.title} categoryLabel={categoryLabel} className="aspect-video mb-3" />
        )}
        <span className="text-2xs font-bold uppercase tracking-widest text-primary mb-1">
          {categoryLabel}
        </span>
        <h2 className="font-black text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
          {article.title}
        </h2>
        <p className="text-site-gray dark:text-gray-400 text-sm line-clamp-2 mb-2">{article.excerpt}</p>
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {article.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-2xs px-1.5 py-0.5 bg-site-light dark:bg-gray-800 text-primary border border-primary/20 dark:border-primary/30">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mt-auto">
          <time>{timeAgo(article.publishedAt)}</time>
          {article.views > 50 && (
            <>
              <span>·</span>
              <span>{formatViews(article.views)} views</span>
            </>
          )}
        </div>
      </Link>
    );
  }

  if (size === 'small') {
    return (
      <Link href={href} className="group flex gap-3 items-start py-2">
        {article.imageUrl ? (
          <div className="relative flex-shrink-0 w-20 h-14 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="80px"
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
            {isAiImage(article.imageUrl) && (
              <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center leading-tight py-0.5" style={{ fontSize: '7px' }}>
                AI generated
              </span>
            )}
          </div>
        ) : (
          <TextThumbnail title={article.title} categoryLabel={categoryLabel} className="flex-shrink-0 w-20 h-14" />
        )}
        <div className="min-w-0">
          <span className="text-2xs font-bold uppercase tracking-widest text-primary block mb-0.5">
            {categoryLabel}
          </span>
          <h3 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <time className="text-xs text-gray-600 dark:text-gray-400 mt-1 block">
            {timeAgo(article.publishedAt)}
          </time>
        </div>
      </Link>
    );
  }

  // Default: medium
  return (
    <Link href={href} className="group flex flex-col">
      {article.imageUrl ? (
        <div className="relative overflow-hidden aspect-video mb-2 bg-gray-100 dark:bg-gray-800">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          {isAiImage(article.imageUrl) && (
            <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-2xs italic text-center py-0.5">
              {AI_LABEL}
            </span>
          )}
        </div>
      ) : (
        <TextThumbnail title={article.title} categoryLabel={categoryLabel} className="aspect-video mb-2" />
      )}
      <span className="text-2xs font-bold uppercase tracking-widest text-primary mb-1">
        {categoryLabel}
      </span>
      <h3 className="font-bold text-base leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-2xs px-1.5 py-0.5 bg-site-light dark:bg-gray-800 text-primary border border-primary/20 dark:border-primary/30">
              {tag}
            </span>
          ))}
        </div>
      )}
      {article.views > 50 && (
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-auto pt-1">{formatViews(article.views)} views</span>
      )}
      <time className="text-xs text-gray-600 dark:text-gray-400 mt-auto pt-1">
        {timeAgo(article.publishedAt)}
      </time>
    </Link>
  );
}

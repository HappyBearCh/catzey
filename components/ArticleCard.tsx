import Link from 'next/link';
import { SafeImage } from '@/components/SafeImage';
import { formatDistanceToNow } from 'date-fns';
import type { Article } from '@/lib/types';
import { getCategoryLabel } from '@/lib/types';
import { titleValue } from '@/lib/number-groups';

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

/**
 * The shelf figure, set after the category kicker. Every card on the site shows
 * both taxonomies at once: what the piece is about, and what it reduces to.
 * Deliberately not a link — a card is already wrapped in one.
 */
function ShelfMark({ n }: { n: number }) {
  return (
    <span className="text-gold/70 font-normal" aria-label={`filed under ${n}`}>
      {' · '}
      {n}
    </span>
  );
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
      <span className="text-primary text-2xs font-semibold uppercase tracking-widest mb-2 block">
        {categoryLabel}
        <ShelfMark n={titleValue(title)} />
      </span>
      <p className="text-white font-semibold leading-snug line-clamp-4 text-lg">
        {title}
      </p>
    </div>
  );
}

export function ArticleCard({ article, size = 'medium', articleBasePath = '/article' }: ArticleCardProps) {
  const categoryLabel = getCategoryLabel(article.category);
  const href = `${articleBasePath}/${article.slug}`;
  const shelf = titleValue(article.title);

  if (size === 'hero') {
    return (
      <Link href={href} className="group relative block overflow-hidden panel bg-black h-[60vw] max-h-[540px] min-h-[320px]">
        {article.imageUrl ? (
          <SafeImage
            src={article.imageUrl}
            alt={article.imageAlt ?? article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover object-top opacity-75 group-hover:opacity-65 transition-opacity duration-300"
            priority
            fallback={<TextThumbnail title={article.title} categoryLabel={categoryLabel} className="absolute inset-0" />}
          />
        ) : (
          <TextThumbnail title={article.title} categoryLabel={categoryLabel} className="absolute inset-0" />
        )}
        {isAiImage(article.imageUrl) && (
          <span className="absolute top-3 right-3 z-10 bg-black/60 text-white text-2xs italic px-2 py-0.5">
            {AI_LABEL}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="inline-flex items-center gap-2 mb-3">
            <span className="inline-block bg-primary text-white text-2xs font-bold uppercase tracking-widest px-2 py-0.5">
              {categoryLabel}
            </span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-white text-white text-2xs font-bold">
              {shelf}
            </span>
          </span>
          {/* h2, not h1: this card is a link to another page, and every page
              that renders it already carries its own h1. Two h1s left the
              homepage and each category archive describing themselves to a
              crawler as being about whichever story happened to lead. */}
          <h2 className="text-white text-2xl md:text-4xl font-semibold leading-tight mb-3 line-clamp-3 group-hover:text-gray-200 transition-colors">
            {article.title}
          </h2>
          <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-3 hidden md:block">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-gray-300 text-xs">
            <time>{timeAgo(article.publishedAt)}</time>
          </div>
        </div>
      </Link>
    );
  }

  if (size === 'large') {
    return (
      <Link href={href} className="group flex flex-col panel p-2 hover:bg-paper-2 dark:hover:bg-ground-2 transition-colors">
        {article.imageUrl ? (
          <div className="relative overflow-hidden aspect-video mb-3 bg-gray-200 dark:bg-gray-800 border-2 border-ink dark:border-parchment">
            <SafeImage
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              fallback={<TextThumbnail title={article.title} categoryLabel={categoryLabel} className="absolute inset-0" />}
            />
            {isAiImage(article.imageUrl) && (
              <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-2xs italic text-center py-0.5">
                {AI_LABEL}
              </span>
            )}
          </div>
        ) : (
          <TextThumbnail title={article.title} categoryLabel={categoryLabel} className="aspect-video mb-3 border-2 border-ink dark:border-parchment" />
        )}
        <span className="text-2xs font-bold uppercase tracking-widest text-primary mb-1">
          {categoryLabel}
          <ShelfMark n={shelf} />
        </span>
        <h2 className="font-semibold text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
          {article.title}
        </h2>
        <p className="text-site-gray dark:text-gray-300 text-sm line-clamp-2 mb-2">{article.excerpt}</p>
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {article.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-2xs px-1.5 py-0.5 bg-site-light dark:bg-gray-800 text-primary border border-primary/40 dark:border-primary/50">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 mt-auto">
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
          <div className="relative flex-shrink-0 w-20 h-14 overflow-hidden bg-gray-200 dark:bg-gray-800">
            <SafeImage
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="80px"
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              fallback={<TextThumbnail title={article.title} categoryLabel={categoryLabel} className="absolute inset-0" />}
            />
            {isAiImage(article.imageUrl) && (
              <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-2xs text-center leading-tight py-0.5">
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
          <ShelfMark n={shelf} />
          </span>
          <h3 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <time className="text-xs text-gray-600 dark:text-gray-300 mt-1 block">
            {timeAgo(article.publishedAt)}
          </time>
        </div>
      </Link>
    );
  }

  // Default: medium
  return (
    <Link href={href} className="group flex flex-col panel p-2 hover:bg-paper-2 dark:hover:bg-ground-2 transition-colors">
      {article.imageUrl ? (
        <div className="relative overflow-hidden aspect-video mb-2 bg-gray-200 dark:bg-gray-800 border-2 border-ink dark:border-parchment">
          <SafeImage
            src={article.imageUrl}
            alt={article.imageAlt ?? article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            fallback={<TextThumbnail title={article.title} categoryLabel={categoryLabel} className="absolute inset-0" />}
          />
          {isAiImage(article.imageUrl) && (
            <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-2xs italic text-center py-0.5">
              {AI_LABEL}
            </span>
          )}
        </div>
      ) : (
        <TextThumbnail title={article.title} categoryLabel={categoryLabel} className="aspect-video mb-2 border-2 border-ink dark:border-parchment" />
      )}
      <span className="text-2xs font-bold uppercase tracking-widest text-primary mb-1">
        {categoryLabel}
          <ShelfMark n={shelf} />
      </span>
      {/* h2: the medium card is the archive grid on /[category], /genre and
          /author, so each title is a top-level item under that page's h1. The
          small variant below stays h3 — it only appears in sidebars and related
          rails, which sit under an h2 section label of their own. */}
      <h2 className="font-bold text-base leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
        {article.title}
      </h2>
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-2xs px-1.5 py-0.5 bg-site-light dark:bg-gray-800 text-primary border border-primary/40 dark:border-primary/50">
              {tag}
            </span>
          ))}
        </div>
      )}
      {article.views > 50 && (
        <span className="text-xs text-gray-500 dark:text-gray-300 mt-auto pt-1">{formatViews(article.views)} views</span>
      )}
      <time className="text-xs text-gray-600 dark:text-gray-300 mt-auto pt-1">
        {timeAgo(article.publishedAt)}
      </time>
    </Link>
  );
}

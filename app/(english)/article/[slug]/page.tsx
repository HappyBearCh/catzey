import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SafeImage } from '@/components/SafeImage';
import { format } from 'date-fns';
import { RelativeTime } from '@/components/RelativeTime';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { ShareButtons } from '@/components/ShareButtons';
import { ViewTracker } from '@/components/ViewTracker';
import { MostRead } from '@/components/MostRead';
import { TagList } from '@/components/TagList';
import { BookmarkButton } from '@/components/BookmarkButton';
import { getCategoryLabel } from '@/lib/types';
import { getGuide } from '@/lib/guides';
import type { Article } from '@/lib/types';
import { BackToTop } from '@/components/BackToTop';
import { ReadingProgress } from '@/components/ReadingProgress';
import { ArticleStickyHeader } from '@/components/ArticleStickyHeader';
import { TableOfContents } from '@/components/TableOfContents';
import { NewsletterCTA } from '@/components/NewsletterCTA';
import { InlineRelated } from '@/components/InlineRelated';
import { SpoilerActivator } from '@/components/SpoilerActivator';
import { NumerologyPanel } from '@/components/NumerologyPanel';
import { extractHeadings, injectHeadingIds, splitHtmlAfterNthParagraph } from '@/lib/headings';
import { linkEntitiesInHtml } from '@/lib/entity-links';
import { resolveAuthor } from '@/lib/authors';
import { getArticleBySlug } from '@/lib/articles';
import { reviewOverall, RATING_SCALE } from '@/lib/reviews';
import type { ReviewData } from '@/lib/types';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Pre-render the most-read articles at build time for fast TTFB / better Core
// Web Vitals. Other slugs are rendered on demand (dynamicParams defaults true).
export async function generateStaticParams() {
  try {
    const top = await prisma.article.findMany({
      where: { published: true },
      orderBy: { views: 'desc' },
      take: 50,
      select: { slug: true },
    });
    return top.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await prisma.article.findUnique({ where: { slug } });
    if (!article) return {};
    const author = resolveAuthor(article);
    const ogImageUrl = `${BASE}/og?title=${encodeURIComponent(article.title)}&category=${article.category}${article.imageUrl ? `&img=${encodeURIComponent(article.imageUrl)}` : ''}`;
    return {
      title: article.title,
      description: article.excerpt,
      authors: [{ name: author.name, url: `${BASE}/author/${author.slug}` }],
      openGraph: {
        title: article.title,
        description: article.excerpt,
        url: `${BASE}/article/${slug}`,
        type: 'article',
        publishedTime: new Date(article.publishedAt).toISOString(),
        modifiedTime: new Date(article.updatedAt).toISOString(),
        authors: [`${BASE}/author/${author.slug}`],
        section: article.category,
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
        tags: article.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: [ogImageUrl],
      },
      alternates: {
        canonical: `${BASE}/article/${slug}`,
      },
      ...(article.tags.length > 0 && {
        other: { news_keywords: article.tags.join(', ') },
      }),
    };
  } catch {
    return {};
  }
}

// Shared with the gating layout via React's request cache, so the existence
// check that keeps notFound() returning a real 404 costs no extra query.
const getArticle = getArticleBySlug;

interface SeriesContext {
  id: string;
  title: string;
  slug: string;
  totalParts: number;
  prev: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
}

async function getSeriesContext(article: Article): Promise<SeriesContext | null> {
  if (!article.seriesId || !article.seriesOrder) return null;
  try {
    const series = await prisma.series.findUnique({
      where: { id: article.seriesId },
      select: { id: true, title: true, slug: true, topics: true },
    });
    if (!series) return null;
    const siblings = await prisma.article.findMany({
      where: { seriesId: article.seriesId, published: true },
      select: { title: true, slug: true, seriesOrder: true },
      orderBy: { seriesOrder: 'asc' },
    });
    const order = article.seriesOrder;
    const prev = siblings.find((s) => s.seriesOrder === order - 1) ?? null;
    const next = siblings.find((s) => s.seriesOrder === order + 1) ?? null;
    const topics = series.topics as string[];
    return {
      id: series.id,
      title: series.title,
      slug: series.slug,
      totalParts: Math.max(topics.length, siblings.length),
      prev: prev ? { title: prev.title, slug: prev.slug } : null,
      next: next ? { title: next.title, slug: next.slug } : null,
    };
  } catch {
    return null;
  }
}

async function getRelated(article: Article): Promise<Article[]> {
  try {
    if (article.tags.length > 0) {
      const candidates = await prisma.article.findMany({
        where: {
          published: true,
          id: { not: article.id },
          OR: [{ tags: { hasSome: article.tags } }, { category: article.category }],
        },
        orderBy: { publishedAt: 'desc' },
        take: 20,
      }) as Article[];
      const scored = candidates
        .map((c) => ({ ...c, _score: c.tags.filter((t) => article.tags.includes(t)).length }))
        .sort((a, b) => b._score - a._score);
      return scored.slice(0, 4);
    }
    return await prisma.article.findMany({
      where: { category: article.category, published: true, id: { not: article.id } },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    }) as Article[];
  } catch {
    return [];
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const [related, seriesCtx] = await Promise.all([
    getRelated(article),
    getSeriesContext(article),
  ]);
  const categoryLabel = getCategoryLabel(article.category);
  const guide = getGuide(article.category);
  const contentIsHtml = article.content.trimStart().startsWith('<');
  const paragraphs = contentIsHtml
    ? []
    : article.content.split(/\n+/).map((p) => p.trim()).filter(Boolean).filter((p) => !/^sources?\s*:/i.test(p));

  const processedHtml = contentIsHtml
    ? injectHeadingIds(linkEntitiesInHtml(article.content, article.entities))
    : '';
  const headings = contentIsHtml ? extractHeadings(processedHtml) : [];
  const [htmlPart1, htmlPart2] = contentIsHtml ? splitHtmlAfterNthParagraph(processedHtml, 3) : ['', ''];

  const mins = readingTime(article.content);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: categoryLabel, item: `${BASE}/${article.category}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${BASE}/article/${article.slug}` },
    ],
  };

  const wordCount = article.content
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  const author = resolveAuthor(article);

  // Entities are curated people/works/places — expose them as the article's
  // subject matter, each pointing at its topic hub to reinforce the entity graph.
  const mentions = article.entities.map((e) => ({
    '@type': 'Thing',
    name: e,
    url: `${BASE}/topic/${encodeURIComponent(e)}`,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.imageUrl
      ? [{
          '@type': 'ImageObject',
          url: article.imageUrl,
          width: 1200,
          height: 675,
          caption: article.imageAlt ?? article.title,
        }]
      : undefined,
    thumbnailUrl: article.imageUrl ?? undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE}/article/${article.slug}`,
    },
    datePublished: new Date(article.publishedAt).toISOString(),
    dateModified: new Date(article.updatedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: author.name,
      url: `${BASE}/author/${author.slug}`,
      jobTitle: author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Catzye',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/icons/icon-512.png`, width: 512, height: 512 },
    },
    url: `${BASE}/article/${article.slug}`,
    inLanguage: 'en',
    keywords: article.tags.join(', '),
    articleSection: article.category,
    isAccessibleForFree: true,
    wordCount,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-prose p'],
    },
    ...(mentions.length > 0 && { about: mentions, mentions }),
  };

  // Review schema for scored articles — makes them eligible for star rich
  // results. The reviewed work is the series (if the article belongs to one),
  // else the primary entity, else the article itself.
  const reviewScore = reviewOverall(article.reviewData as ReviewData | null);
  const reviewLd = reviewScore != null
    ? {
        '@context': 'https://schema.org',
        '@type': 'Review',
        itemReviewed: {
          '@type': 'CreativeWorkSeries',
          name: seriesCtx?.title ?? article.entities[0] ?? article.title,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: reviewScore,
          bestRating: RATING_SCALE,
          worstRating: 1,
        },
        name: article.title,
        reviewBody: article.excerpt,
        datePublished: new Date(article.publishedAt).toISOString(),
        author: { '@type': 'Person', name: author.name, url: `${BASE}/author/${author.slug}` },
        publisher: { '@type': 'Organization', name: 'Catzye', url: BASE },
        url: `${BASE}/article/${article.slug}`,
      }
    : null;

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <ReadingProgress />
      <ArticleStickyHeader title={article.title} url={`${BASE}/article/${article.slug}`} />
      <BackToTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {reviewLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }} />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main article */}
        <article className="lg:col-span-2">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 mb-4 uppercase tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span aria-hidden="true">›</span>
            <Link href={`/${article.category}`} className="hover:text-primary transition-colors">
              {categoryLabel}
            </Link>
          </nav>

          {/* Series banner */}
          {seriesCtx && (
            <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-sm flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white text-sm font-black flex items-center justify-center">
                {article.seriesOrder}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xs font-black uppercase tracking-wider text-primary">
                  Part {article.seriesOrder} of {seriesCtx.totalParts}
                </p>
                <Link href={`/series/${seriesCtx.slug}`} className="text-sm font-bold hover:text-primary transition-colors line-clamp-1">
                  {seriesCtx.title}
                </Link>
              </div>
              <Link
                href={`/series/${seriesCtx.slug}`}
                className="flex-shrink-0 text-2xs font-bold text-primary border border-primary/30 px-2 py-1 rounded hover:bg-primary hover:text-white transition-colors"
              >
                All Parts
              </Link>
            </div>
          )}

          <span className="inline-block bg-primary text-white text-2xs font-black uppercase tracking-widest px-2 py-0.5 mb-3">
            {categoryLabel}
          </span>

          <h1 className="text-2xl md:text-4xl font-black leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-300 border-b border-site-border pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span>
                By{' '}
                <Link href={`/author/${author.slug}`} rel="author" className="font-semibold text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
                  {author.name}
                </Link>
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={new Date(article.publishedAt).toISOString()}>
                {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
              </time>
              <span aria-hidden="true">·</span>
              <RelativeTime date={article.publishedAt} />
              <span aria-hidden="true">·</span>
              <span>{mins} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <ShareButtons url={`${BASE}/article/${article.slug}`} title={article.title} />
              <BookmarkButton article={{ slug: article.slug, title: article.title, excerpt: article.excerpt, imageUrl: article.imageUrl, category: article.category, publishedAt: new Date(article.publishedAt).toISOString() }} />
            </div>
          </div>
          <ViewTracker slug={article.slug} />

          <SpoilerActivator />

          {/* Chapter review scorecard */}
          {article.reviewData && (() => {
            const r = article.reviewData as ReviewData;
            const scores = [
              { label: 'Story', value: r.story },
              { label: 'Art', value: r.art },
              { label: 'Pacing', value: r.pacing },
              { label: 'Characters', value: r.characters },
            ].filter((s) => s.value != null);
            if (scores.length === 0) return null;
            return (
              <div className="review-scorecard mb-6">
                <div className="review-scorecard-header">
                  <span className="text-xs font-black uppercase tracking-wider">
                    Chapter Review{r.chapterNumber ? ` — Ch. ${r.chapterNumber}` : ''}
                  </span>
                  {r.overall != null && (
                    <span className="text-2xl font-black">{r.overall}<span className="text-sm font-normal opacity-70">/10</span></span>
                  )}
                </div>
                <div className="review-scorecard-body">
                  {scores.map((s) => (
                    <div key={s.label} className="review-score-item">
                      <div className="review-score-label">{s.label}</div>
                      <div className="review-score-value">{s.value}</div>
                    </div>
                  ))}
                </div>
                {r.verdict && <div className="review-score-verdict">&ldquo;{r.verdict}&rdquo;</div>}
              </div>
            );
          })()}

          <figure className="mb-6">
            {article.imageUrl ? (
              <div className="relative w-full aspect-video overflow-hidden">
                <SafeImage
                  src={article.imageUrl}
                  alt={article.imageAlt ?? article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                  fallback={
                    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-center px-8">
                      <span className="text-primary text-xs font-black uppercase tracking-widest mb-3 block">{categoryLabel}</span>
                      <p className="text-white font-black text-xl md:text-3xl leading-snug">{article.title}</p>
                    </div>
                  }
                />
                {article.imageUrl.includes('/articles/ai-') && (
                  <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs italic text-center py-1.5">
                    Illustration
                  </span>
                )}
              </div>
            ) : (
              <div className="w-full h-64 md:h-80 bg-black flex flex-col items-center justify-center text-center px-8 rounded-sm">
                <span className="text-primary text-xs font-black uppercase tracking-widest mb-3 block">{categoryLabel}</span>
                <p className="text-white font-black text-xl md:text-3xl leading-snug">{article.title}</p>
              </div>
            )}
          </figure>

          <div className="article-prose text-gray-800 dark:text-gray-200">
            {contentIsHtml ? (
              <>
                <div dangerouslySetInnerHTML={{ __html: htmlPart1 }} />
                {article.pullQuote && (
                  <blockquote className="my-6 border-l-4 border-primary pl-5 py-3 bg-primary/5 not-prose">
                    <p className="text-lg md:text-xl font-bold text-gray-900 leading-snug italic">
                      &ldquo;{article.pullQuote}&rdquo;
                    </p>
                  </blockquote>
                )}
                {related.length >= 2 && <InlineRelated articles={related.slice(0, 2)} />}
                {htmlPart2 && <div dangerouslySetInnerHTML={{ __html: htmlPart2 }} />}
              </>
            ) : (
              <>
                {paragraphs.slice(0, 3).map((para, i) => <p key={i}>{para}</p>)}
                {article.pullQuote && (
                  <blockquote className="my-6 border-l-4 border-primary pl-5 py-3 bg-primary/5 not-prose">
                    <p className="text-lg md:text-xl font-bold text-gray-900 leading-snug italic">
                      &ldquo;{article.pullQuote}&rdquo;
                    </p>
                  </blockquote>
                )}
                {related.length >= 2 && paragraphs.length > 3 && (
                  <InlineRelated articles={related.slice(0, 2)} />
                )}
                {paragraphs.slice(3).map((para, i) => <p key={`b${i}`}>{para}</p>)}
              </>
            )}
          </div>

          {article.editorNote && (
            <div className="mt-6 p-4 bg-gray-50 border border-site-border rounded-sm">
              <p className="text-2xs font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 bg-primary rounded-full" />
                Catzye Take
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{article.editorNote}</p>
            </div>
          )}

          {/* Numerological reading of the story's primary subject */}
          <NumerologyPanel
            title={article.title}
            entities={article.entities}
            category={article.category}
            className="mt-8"
          />

          <NewsletterCTA />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-6 pt-4 border-t border-site-border">
              <TagList tags={article.tags} />
            </div>
          )}

          {/* Entities */}
          {article.entities.length > 0 && (
            <div className="mt-3">
              <p className="text-2xs font-bold uppercase tracking-wider text-gray-600 mb-2">People & Places</p>
              <div className="flex flex-wrap gap-2">
                {article.entities.map((entity) => (
                  <Link
                    key={entity}
                    href={`/topic/${encodeURIComponent(entity)}`}
                    className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors rounded-sm"
                  >
                    {entity}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Guide callout */}
          {guide && (
            <div className="mt-6 p-4 border-l-4 border-primary bg-primary/5">
              <p className="text-2xs font-black uppercase tracking-widest text-primary mb-1">Want to learn more?</p>
              <Link
                href={`/${article.category}/guide`}
                className="font-bold text-sm hover:text-primary transition-colors"
              >
                Read our complete {categoryLabel} guide →
              </Link>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-site-border text-sm text-gray-600">
            Source:{' '}
            <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
              {article.source}
            </a>
          </div>

          {/* Series prev/next */}
          {seriesCtx && (seriesCtx.prev || seriesCtx.next) && (
            <div className="mt-8 pt-6 border-t border-site-border grid grid-cols-2 gap-4">
              {seriesCtx.prev ? (
                <Link href={`/article/${seriesCtx.prev.slug}`} className="group flex flex-col gap-1 p-3 border border-site-border rounded-sm hover:border-primary/40 hover:shadow-sm transition-all">
                  <span className="text-2xs font-bold uppercase tracking-wider text-gray-300">← Previous part</span>
                  <span className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {seriesCtx.prev.title}
                  </span>
                </Link>
              ) : <div />}
              {seriesCtx.next ? (
                <Link href={`/article/${seriesCtx.next.slug}`} className="group flex flex-col gap-1 p-3 border border-site-border rounded-sm hover:border-primary/40 hover:shadow-sm transition-all text-right">
                  <span className="text-2xs font-bold uppercase tracking-wider text-gray-300">Next part →</span>
                  <span className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {seriesCtx.next.title}
                  </span>
                </Link>
              ) : <div />}
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-10 pt-6 border-t border-site-border">
              <div className="flex items-center gap-2 mb-5">
                <span className="block w-1 h-5 bg-primary" />
                <h2 className="text-sm font-black uppercase tracking-wider">You May Also Like</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <ArticleCard key={rel.id} article={rel} size="small" />
                ))}
              </div>
              <Link
                href={`/${article.category}`}
                className="mt-5 block text-center text-xs font-bold uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors"
              >
                All {categoryLabel} News →
              </Link>
            </div>
          )}

        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            {headings.length >= 3 && <TableOfContents headings={headings} />}
            {related.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="block w-1 h-5 bg-primary" />
                  <h2 className="text-sm font-black uppercase tracking-wider">
                    More in {categoryLabel}
                  </h2>
                </div>
                <div className="divide-y divide-site-border">
                  {related.map((rel) => (
                    <ArticleCard key={rel.id} article={rel} size="small" />
                  ))}
                </div>
                <Link
                  href={`/${article.category}`}
                  className="mt-4 block text-center text-xs font-bold uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors"
                >
                  All {categoryLabel} News →
                </Link>
              </>
            )}

            <MostRead currentSlug={article.slug} />
          </div>
        </aside>
      </div>
    </div>
  );
}

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow, format } from 'date-fns';
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
import { extractHeadings, injectHeadingIds, splitHtmlAfterNthParagraph } from '@/lib/headings';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await prisma.article.findUnique({ where: { slug } });
    if (!article) return {};
    const ogImageUrl = `${BASE}/og?title=${encodeURIComponent(article.title)}&category=${article.category}${article.imageUrl ? `&img=${encodeURIComponent(article.imageUrl)}` : ''}`;
    return {
      title: article.title,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        url: `${BASE}/article/${slug}`,
        type: 'article',
        publishedTime: new Date(article.publishedAt).toISOString(),
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

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const article = await prisma.article.findUnique({ where: { slug, published: true } });
    if (!article) return null;
    return article as Article;
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

  const related = await getRelated(article);
  const categoryLabel = getCategoryLabel(article.category);
  const guide = getGuide(article.category);
  const contentIsHtml = article.content.trimStart().startsWith('<');
  const paragraphs = contentIsHtml
    ? []
    : article.content.split(/\n+/).map((p) => p.trim()).filter(Boolean).filter((p) => !/^sources?\s*:/i.test(p));

  const processedHtml = contentIsHtml ? injectHeadingIds(article.content) : '';
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.imageUrl ? [article.imageUrl] : undefined,
    datePublished: new Date(article.publishedAt).toISOString(),
    dateModified: new Date(article.updatedAt).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Catzye Editorial',
      url: BASE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Catzye',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.png`, width: 200, height: 60 },
    },
    url: `${BASE}/article/${article.slug}`,
    inLanguage: 'en',
    keywords: article.tags.join(', '),
    articleSection: article.category,
    isAccessibleForFree: true,
    wordCount,
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <ReadingProgress />
      <ArticleStickyHeader title={article.title} url={`${BASE}/article/${article.slug}`} />
      <BackToTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main article */}
        <article className="lg:col-span-2">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-600 mb-4 uppercase tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>›</span>
            <Link href={`/${article.category}`} className="hover:text-primary transition-colors">
              {categoryLabel}
            </Link>
          </nav>

          <span className="inline-block bg-primary text-white text-2xs font-black uppercase tracking-widest px-2 py-0.5 mb-3">
            {categoryLabel}
          </span>

          <h1 className="text-2xl md:text-4xl font-black leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600 border-b border-site-border pb-4 mb-6">
            <div className="flex items-center gap-3">
              <time dateTime={new Date(article.publishedAt).toISOString()}>
                {format(new Date(article.publishedAt), 'MMMM d, yyyy')} (
                {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })})
              </time>
              <span className="text-gray-400">·</span>
              <span>{mins} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <ShareButtons url={`${BASE}/article/${article.slug}`} title={article.title} />
              <BookmarkButton article={{ slug: article.slug, title: article.title, excerpt: article.excerpt, imageUrl: article.imageUrl, category: article.category, publishedAt: new Date(article.publishedAt).toISOString() }} />
            </div>
          </div>
          <ViewTracker slug={article.slug} />

          <figure className="mb-6">
            {article.imageUrl ? (
              <div className="relative w-full aspect-video rounded-sm overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
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

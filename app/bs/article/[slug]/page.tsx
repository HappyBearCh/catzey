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
import { getCategoryLabelBs, bsArticle } from '@/lib/types';
import type { Article } from '@/lib/types';

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
    const bs = bsArticle(article as Article);
    const ogImageUrl = `${BASE}/og?title=${encodeURIComponent(bs.title)}&category=${article.category}${article.imageUrl ? `&img=${encodeURIComponent(article.imageUrl)}` : ''}`;
    return {
      title: bs.title,
      description: bs.excerpt,
      openGraph: {
        title: bs.title,
        description: bs.excerpt,
        url: `${BASE}/bs/article/${slug}`,
        type: 'article',
        publishedTime: new Date(article.publishedAt).toISOString(),
        section: article.category,
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: bs.title,
        description: bs.excerpt,
        images: [ogImageUrl],
      },
      alternates: {
        canonical: `${BASE}/bs/article/${slug}`,
        languages: { 'en': `${BASE}/article/${slug}` },
      },
    };
  } catch {
    return {};
  }
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const article = await prisma.article.findUnique({ where: { slug, published: true } });
    if (!article) return null;
    if (article.displayLang === 'en') return null;
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
          displayLang: { in: ['bs', 'both'] },
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
      where: { category: article.category, published: true, id: { not: article.id }, displayLang: { in: ['bs', 'both'] } },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    }) as Article[];
  } catch {
    return [];
  }
}

function isHtml(s: string) {
  return s.trimStart().startsWith('<');
}

export default async function BosnianArticlePage({ params }: Props) {
  const { slug } = await params;
  const rawArticle = await getArticle(slug);
  if (!rawArticle) notFound();

  const article = bsArticle(rawArticle);
  const rawRelated = await getRelated(rawArticle);
  const related = rawRelated.map(bsArticle);
  const categoryLabel = getCategoryLabelBs(article.category);

  const content = article.content;
  const paragraphs = isHtml(content)
    ? null
    : content.split(/\n+/).map((p) => p.trim()).filter(Boolean).filter((p) => !/^(izvor|sources?)\s*:/i.test(p));

  const mins = readingTime(content);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Početna', item: `${BASE}/bs` },
      { '@type': 'ListItem', position: 2, name: categoryLabel, item: `${BASE}/bs/${rawArticle.category}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${BASE}/bs/article/${slug}` },
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: rawArticle.imageUrl ? [rawArticle.imageUrl] : undefined,
    datePublished: new Date(rawArticle.publishedAt).toISOString(),
    dateModified: new Date(rawArticle.updatedAt).toISOString(),
    author: { '@type': 'Organization', name: 'Catzye' },
    publisher: { '@type': 'Organization', name: 'Catzye', url: BASE },
    url: `${BASE}/bs/article/${slug}`,
    inLanguage: 'bs',
    keywords: rawArticle.tags.join(', '),
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main article */}
        <article className="lg:col-span-2">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4 uppercase tracking-wider">
            <Link href="/bs" className="hover:text-primary transition-colors">Početna</Link>
            <span>›</span>
            <Link href={`/bs/${rawArticle.category}`} className="hover:text-primary transition-colors">
              {categoryLabel}
            </Link>
          </nav>

          <span className="inline-block bg-primary text-white text-2xs font-black uppercase tracking-widest px-2 py-0.5 mb-3">
            {categoryLabel}
          </span>

          <h1 className="text-2xl md:text-4xl font-black leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500 border-b border-site-border pb-4 mb-6">
            <div className="flex items-center gap-3">
              <time dateTime={new Date(rawArticle.publishedAt).toISOString()}>
                {format(new Date(rawArticle.publishedAt), 'd. MMMM yyyy.')} (
                {formatDistanceToNow(new Date(rawArticle.publishedAt), { addSuffix: true })})
              </time>
              <span className="text-gray-300">·</span>
              <span>{mins} min čitanja</span>
            </div>
            <div className="flex items-center gap-2">
              <ShareButtons url={`${BASE}/bs/article/${slug}`} title={article.title} />
              <BookmarkButton article={{ slug: rawArticle.slug, title: article.title, excerpt: article.excerpt, imageUrl: rawArticle.imageUrl, category: rawArticle.category, publishedAt: new Date(rawArticle.publishedAt).toISOString() }} />
            </div>
          </div>
          <ViewTracker slug={rawArticle.slug} />

          <figure className="mb-6">
            {rawArticle.imageUrl ? (
              <div className="relative w-full aspect-video rounded-sm overflow-hidden">
                <Image
                  src={rawArticle.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
                {rawArticle.imageUrl.includes('/articles/ai-') && (
                  <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs italic text-center py-1.5">
                    Ilustracija
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

          <div className="article-prose text-gray-800">
            {isHtml(content) ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              paragraphs!.map((para, i) => <p key={i}>{para}</p>)
            )}
          </div>

          {/* Tags */}
          {rawArticle.tags.length > 0 && (
            <div className="mt-6 pt-4 border-t border-site-border">
              <TagList tags={rawArticle.tags} basePath="/bs" />
            </div>
          )}

          {/* Entities */}
          {rawArticle.entities.length > 0 && (
            <div className="mt-3">
              <p className="text-2xs font-bold uppercase tracking-wider text-gray-400 mb-2">Osobe i mjesta</p>
              <div className="flex flex-wrap gap-2">
                {rawArticle.entities.map((entity) => (
                  <Link
                    key={entity}
                    href={`/bs/search?q=${encodeURIComponent(entity)}`}
                    className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors rounded-sm"
                  >
                    {entity}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-site-border text-sm text-gray-500">
            Izvor:{' '}
            <a href={rawArticle.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
              {rawArticle.source}
            </a>
          </div>

          <div className="mt-4 pt-4 border-t border-site-border">
            <Link href={`/article/${slug}`} className="text-xs text-gray-400 hover:text-primary transition-colors">
              Read in English →
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            {related.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="block w-1 h-5 bg-primary" />
                  <h2 className="text-sm font-black uppercase tracking-wider">
                    Više iz: {categoryLabel}
                  </h2>
                </div>
                <div className="divide-y divide-site-border">
                  {related.map((rel) => (
                    <ArticleCard key={rel.id} article={rel} size="small" articleBasePath="/bs/article" />
                  ))}
                </div>
                <Link
                  href={`/bs/${rawArticle.category}`}
                  className="mt-4 block text-center text-xs font-bold uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors"
                >
                  Sve {categoryLabel} vijesti →
                </Link>
              </>
            )}

            <MostRead currentSlug={rawArticle.slug} basePath="/bs" />
          </div>
        </aside>
      </div>
    </div>
  );
}

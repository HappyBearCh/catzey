import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { prisma } from '@/lib/db';
import { getCategoryLabel } from '@/lib/types';

export const revalidate = 86400; // archive content; on-demand revalidation covers real changes

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props { params: Promise<{ slug: string }> }

// A handful of series, all known at build time. Beyond prerendering them, this
// is what puts the route on ISR at all — a dynamic segment with no
// generateStaticParams renders per request and is never cached, which made the
// `revalidate` above a no-op.
export async function generateStaticParams() {
  try {
    const series = await prisma.series.findMany({ select: { slug: true } });
    return series.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

async function getSeries(slug: string) {
  const series = await prisma.series.findUnique({
    where: { slug },
    include: {
      articles: {
        where: { published: true },
        orderBy: { seriesOrder: 'asc' },
        select: {
          id: true, title: true, slug: true, excerpt: true,
          imageUrl: true, seriesOrder: true, publishedAt: true, tags: true,
        },
      },
    },
  });
  if (!series) return null;
  return { ...series, topics: series.topics as string[], genres: (series.genres as string[]) ?? [] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeries(slug);
  if (!series) return {};
  return {
    title: `${series.title} — Essay Series — Catzye`,
    description: series.description ?? `An essay series on ${series.title}.`,
    alternates: { canonical: `${BASE}/series/${slug}` },
    openGraph: {
      title: series.title,
      description: series.description ?? '',
      url: `${BASE}/series/${slug}`,
      type: 'website',
      images: series.imageUrl ? [{ url: series.imageUrl, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = await getSeries(slug);
  if (!series) notFound();

  const publishedParts = series.articles;
  const totalParts = series.topics.length || publishedParts.length;
  const categoryLabel = getCategoryLabel(series.category);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: series.title,
    description: series.description,
    url: `${BASE}/series/${slug}`,
    numberOfItems: publishedParts.length,
    itemListElement: publishedParts.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/article/${a.slug}`,
      name: a.title,
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Series', item: `${BASE}/series` },
      { '@type': 'ListItem', position: 3, name: series.title, item: `${BASE}/series/${slug}` },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/series" className="hover:text-primary">Series</Link>
        <span aria-hidden="true">›</span>
        <span className="text-gray-800">{series.title}</span>
      </nav>

      {/* Hero */}
      <div className="mb-8">
        {series.imageUrl && (
          <div className="relative w-full aspect-video rounded-sm overflow-hidden mb-6">
            <Image src={series.imageUrl} alt={series.title} fill className="object-cover" priority />
          </div>
        )}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xs font-black uppercase tracking-widest text-primary">{categoryLabel}</span>
          <span className="text-gray-300">·</span>
          <span className="text-2xs text-gray-500">{publishedParts.length} of {totalParts} parts published</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-3">{series.title}</h1>
        {/* Status + genres */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {series.status && (
            <span className={`text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              series.status === 'ongoing' ? 'bg-green-100 text-green-700' :
              series.status === 'complete' ? 'bg-blue-100 text-blue-700' :
              series.status === 'hiatus' ? 'bg-amber-100 text-amber-700' :
              'bg-gray-100 text-gray-600'
            }`}>
              {series.status.charAt(0).toUpperCase() + series.status.slice(1)}
            </span>
          )}
          {(series.genres as string[]).map((g: string) => (
            <span key={g} className="text-2xs px-2 py-0.5 bg-site-light dark:bg-gray-800 text-primary border border-primary/30 rounded-sm">
              {g}
            </span>
          ))}
          {series.externalUrl && (
            <a
              href={series.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xs font-semibold text-primary hover:underline"
            >
              Official Site ↗
            </a>
          )}
        </div>
        {series.synopsis && (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mb-2">{series.synopsis}</p>
        )}
        {series.description && (
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-2xl">{series.description}</p>
        )}
        {/* Progress bar */}
        <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-xs">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${Math.round((publishedParts.length / Math.max(totalParts, 1)) * 100)}%` }}
          />
        </div>
        <p className="text-2xs text-gray-400 mt-1">
          {Math.round((publishedParts.length / Math.max(totalParts, 1)) * 100)}% complete
        </p>
      </div>

      {/* Parts list */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 border-b border-site-border pb-2">
          Parts in this series
        </h2>

        {series.topics.map((topic, i) => {
          const partNum = i + 1;
          const article = publishedParts.find((a) => a.seriesOrder === partNum);

          if (!article) {
            return (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 border border-dashed border-gray-200 rounded-sm opacity-60">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-400 text-sm font-black flex items-center justify-center">
                  {partNum}
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">Coming Soon</p>
                  <p className="text-sm text-gray-500 italic">{topic}</p>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={i}
              href={`/article/${article.slug}`}
              className="flex items-start gap-4 p-4 bg-white border border-site-border rounded-sm hover:shadow-sm hover:border-primary/30 transition-all group"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white text-sm font-black flex items-center justify-center">
                {partNum}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Part {partNum}</p>
                <h3 className="font-black text-base leading-snug mb-1 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
                <p className="text-2xs text-gray-400 mt-2">
                  {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
                </p>
              </div>
              {article.imageUrl && (
                <div className="flex-shrink-0 relative w-20 h-14 rounded overflow-hidden hidden sm:block">
                  <Image src={article.imageUrl} alt="" fill className="object-cover" />
                </div>
              )}
            </Link>
          );
        })}

        {/* If no topics planned but articles exist */}
        {series.topics.length === 0 && publishedParts.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="flex items-start gap-4 p-4 bg-white border border-site-border rounded-sm hover:shadow-sm hover:border-primary/30 transition-all group"
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white text-sm font-black flex items-center justify-center">
              {article.seriesOrder}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-base leading-snug mb-1 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

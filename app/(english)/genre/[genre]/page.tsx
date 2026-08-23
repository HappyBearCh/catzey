import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { NumberReading } from '@/components/NumberReading';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { getGenreInfo, getAllGenres } from '@/lib/genre-info';
import { tagHref } from '@/lib/tags';
import type { Article } from '@/lib/types';

export const revalidate = 21600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props { params: Promise<{ genre: string }> }

export async function generateStaticParams() {
  return getAllGenres().map((g) => ({ genre: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genre } = await params;
  const info = getGenreInfo(genre);
  if (!info) return {};
  return {
    title: `${info.label} Manga & Anime — Guides, Series & Reference`,
    description: info.description,
    alternates: {
      canonical: `${BASE}/genre/${genre}`,
      types: { 'application/rss+xml': `${BASE}/genre/${genre}/feed.xml` },
    },
    openGraph: {
      siteName: 'Catzye',
      locale: 'en_US',
      type: 'website',
      images: [{ url: `/og?title=${encodeURIComponent(info.label + ' Manga & Anime')}`, width: 1200, height: 630 }],
      title: `${info.label} | Catzye`,
      description: info.description,
      url: `${BASE}/genre/${genre}`,
    },
  };
}

export default async function GenrePage({ params }: Props) {
  const { genre } = await params;
  const info = getGenreInfo(genre);
  if (!info) notFound();

  const articles = await prisma.article.findMany({
    where: {
      published: true,
      tags: { hasSome: info.relatedTags },
    },
    orderBy: { publishedAt: 'desc' },
    take: 24,
  }) as Article[];

  const allGenres = getAllGenres();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${info.label} Manga & Anime`,
    description: info.description,
    url: `${BASE}/genre/${genre}`,
    numberOfItems: articles.length,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Genres', item: `${BASE}/genre/${genre}` },
      { '@type': 'ListItem', position: 3, name: info.label, item: `${BASE}/genre/${genre}` },
    ],
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span aria-hidden="true">›</span>
        <span>Genre</span>
        <span aria-hidden="true">›</span>
        <span className="text-gray-800 dark:text-gray-200">{info.label}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Genre header */}
          <div className="mb-8 pb-6 border-b border-site-border dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-1 h-8 bg-primary" />
              <h1 className="text-4xl font-semibold tracking-tight">{info.label}</h1>
            </div>
            <p className="text-site-gray dark:text-gray-300 text-lg leading-relaxed max-w-2xl ml-4 mb-4">
              {info.description}
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl ml-4">
              {info.longDescription}
            </p>

            <NumberReading
              title={info.label}
              label="genre"
              seed={info.slug}
              className="mt-6 ml-4 max-w-2xl"
            />
          </div>

          {/* Articles */}
          {articles.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-xl font-bold text-gray-400 mb-2">No articles yet</p>
              <p className="text-sm text-gray-400">Check back soon — new {info.label} coverage is added daily.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-1 h-6 bg-primary" />
                <h2 className="text-lg font-semibold uppercase tracking-wide">
                  Latest in {info.label}
                </h2>
                <span className="ml-auto text-xs text-gray-400">{articles.length} articles</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} size="medium" />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Notable works */}
          {info.notableWorks.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-1 h-5 bg-primary" />
                <h2 className="text-sm font-semibold uppercase tracking-wider">Essential {info.label}</h2>
              </div>
              <ul className="space-y-1">
                {info.notableWorks.map((work) => (
                  <li key={work}>
                    <Link
                      href={tagHref(work)}
                      className="flex items-center gap-2 py-2 border-b border-site-border dark:border-gray-800 text-sm font-semibold hover:text-primary transition-colors group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      {work}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related tags */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="block w-1 h-5 bg-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-wider">Related Tags</h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {info.relatedTags.map((tag) => (
                <Link
                  key={tag}
                  href={tagHref(tag)}
                  className="text-2xs px-2 py-1 bg-site-light dark:bg-gray-800 text-primary border border-primary/30 hover:bg-primary hover:text-white transition-colors rounded-sm"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Other genres */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="block w-1 h-5 bg-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-wider">Other Genres</h2>
            </div>
            <ul className="space-y-1">
              {allGenres.filter((g) => g.slug !== genre).map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/genre/${g.slug}`}
                    className="block py-2 border-b border-site-border dark:border-gray-800 text-sm hover:text-primary transition-colors group"
                  >
                    <span className="font-bold group-hover:text-primary">{g.label}</span>
                    <span className="text-gray-400 dark:text-gray-500 text-xs block">{g.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

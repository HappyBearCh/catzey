import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import type { Article } from '@/lib/types';

export const revalidate = 3600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ entity: string }>;
}

function decodeEntity(raw: string): string {
  return decodeURIComponent(raw);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { entity } = await params;
  const name = decodeEntity(entity);
  const canonicalUrl = `${BASE}/topic/${entity}`;
  const ogImage = `/og?title=${encodeURIComponent(name + ' — Manga & Anime News')}`;
  return {
    title: `${name} — Manga & Anime News`,
    description: `All manga and anime news and updates about ${name} on Catzye.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${name} | Catzye`,
      description: `All manga and anime news and updates about ${name}.`,
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} | Catzye`,
      images: [ogImage],
    },
  };
}

export default async function TopicPage({ params }: Props) {
  const { entity } = await params;
  const name = decodeEntity(entity);

  const articles = await prisma.article.findMany({
    where: {
      published: true,
      entities: { has: name },
    },
    orderBy: { publishedAt: 'desc' },
    take: 24,
  }) as Article[];

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description: `Manga and anime news about ${name}`,
    url: `${BASE}/topic/${entity}`,
    numberOfItems: articles.length,
    ...(articles.length > 0 && {
      hasPart: articles.slice(0, 10).map((a) => ({
        '@type': 'NewsArticle',
        headline: a.title,
        url: `${BASE}/article/${a.slug}`,
      })),
    }),
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <span className="text-primary font-bold">{name}</span>
      </nav>

      <div className="flex items-center gap-3 mb-2">
        <span className="block w-1 h-8 bg-primary" />
        <h1 className="text-3xl font-black tracking-tight">{name}</h1>
      </div>
      <p className="text-site-gray text-sm mb-8 ml-4">
        {articles.length} article{articles.length !== 1 ? 's' : ''} about {name}
      </p>

      {articles.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-xl font-bold mb-2">No articles found</p>
          <p className="text-sm">Try searching instead.</p>
          <Link href={`/search?q=${encodeURIComponent(name)}`} className="mt-4 inline-block text-primary hover:underline text-sm font-bold">
            Search for &ldquo;{name}&rdquo; →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} size="medium" />
          ))}
        </div>
      )}
    </div>
  );
}

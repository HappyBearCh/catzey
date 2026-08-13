import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  CategoryArchive,
  CATEGORY_DESCRIPTIONS,
} from '@/components/CategoryArchive';
import { CATEGORIES, getCategoryLabel } from '@/lib/types';

export const revalidate = 1800;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

// No searchParams here on purpose. Reading them makes the route dynamic, which
// silently disables `revalidate` and generateStaticParams below and turns every
// category hit into a function invocation plus two database queries. Legacy
// `?sort=` / `?page=` URLs are redirected to their path equivalents in proxy.ts,
// before the request ever reaches the cache.
interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = getCategoryLabel(category);
  const description = CATEGORY_DESCRIPTIONS[category] ?? `Latest ${label} manga and anime news and updates.`;
  const canonicalUrl = `${BASE}/${category}`;
  const ogImage = `/og?title=${encodeURIComponent(label + ' News')}&category=${category}`;

  return {
    title: `${label} News`,
    description,
    alternates: {
      canonical: canonicalUrl,
      types: { 'application/rss+xml': `${BASE}/${category}/feed.xml` },
    },
    openGraph: {
      title: `${label} News | Catzye`,
      description,
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${label} News | Catzye`,
      description,
      images: [ogImage],
    },
  };
}

export function generateStaticParams() {
  return CATEGORIES.map(({ slug }) => ({ category: slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const validCategory = CATEGORIES.find((c) => c.slug === category);
  if (!validCategory) notFound();

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: `${validCategory.label} News`, item: `${BASE}/${category}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <CategoryArchive category={category} page={1} sort="latest" />
    </>
  );
}

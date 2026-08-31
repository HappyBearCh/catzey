import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  CategoryArchive,
  CATEGORY_DESCRIPTIONS,
} from '@/components/CategoryArchive';
import { CATEGORIES, getCategoryLabel } from '@/lib/types';
import { categoryCount } from '@/lib/articles';
import { metaDescription, openGraph, twitter } from '@/lib/seo';

// Frozen edition (see lib/db.ts) — nothing here changes until the next deploy,
// so a timer only bought re-renders and ISR writes for identical output.
export const revalidate = false;

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
  const description = metaDescription(
    CATEGORY_DESCRIPTIONS[category] ?? `Everything Catzye files under ${label}.`,
  );
  const canonicalUrl = `${BASE}/${category}`;
  const title = label;
  const ogImage = `/og?title=${encodeURIComponent(title)}&category=${category}`;

  // Six of the ten declared categories have never carried an article. They
  // still render — the standing description is real copy — but an archive with
  // an empty list is a thin page, and shipping six of them indexable invites
  // exactly the "crawled, currently not indexed" verdict that drags on the
  // rest of the site. They stay followable so the nav still passes equity.
  const count = await categoryCount(category);

  return {
    title,
    description,
    ...(count === 0 && { robots: { index: false, follow: true } }),
    alternates: {
      canonical: canonicalUrl,
      types: { 'application/rss+xml': `${BASE}/${category}/feed.xml` },
    },
    openGraph: openGraph({
      title: `${title} | Catzye`,
      description,
      url: canonicalUrl,
      image: ogImage,
    }),
    twitter: twitter({ title: `${title} | Catzye`, description, image: ogImage }),
  };
}

export function generateStaticParams() {
  return CATEGORIES.map(({ slug }) => ({ category: slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const validCategory = CATEGORIES.find((c) => c.slug === category);
  if (!validCategory) notFound();

  // The breadcrumb trail is emitted by CategoryArchive, which renders on page 1
  // and on every paginated page alike. Emitting a second, near-identical
  // BreadcrumbList here only gave page 1 two conflicting trails.
  return <CategoryArchive category={category} page={1} sort="latest" />;
}

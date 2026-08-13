import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import {
  CategoryArchive,
  CATEGORY_DESCRIPTIONS,
  categoryPageHref,
} from '@/components/CategoryArchive';
import { CATEGORIES, getCategoryLabel } from '@/lib/types';

export const revalidate = 1800;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ category: string; page: string }>;
}

// Nothing is prerendered at build — page counts move with every publish — but
// declaring this is what opts the route into ISR at all. A dynamic segment with
// no generateStaticParams is rendered per request and never cached.
export function generateStaticParams() {
  return [] as { category: string; page: string }[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, page: pageStr } = await params;
  const page = parseInt(pageStr);
  if (!Number.isFinite(page) || page < 2) return {};
  const label = getCategoryLabel(category);
  const description = CATEGORY_DESCRIPTIONS[category] ?? `Latest ${label} manga and anime news and updates.`;
  const canonicalUrl = `${BASE}/${category}/page/${page}`;
  const ogImage = `/og?title=${encodeURIComponent(label + ' News')}&category=${category}`;

  return {
    title: `${label} News — Page ${page}`,
    description: `${description} Page ${page} of the ${label} archive.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${label} News — Page ${page} | Catzye`,
      description,
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${label} News — Page ${page} | Catzye`,
      description,
      images: [ogImage],
    },
  };
}

export default async function CategoryPaginatedPage({ params }: Props) {
  const { category, page: pageStr } = await params;

  const validCategory = CATEGORIES.find((c) => c.slug === category);
  if (!validCategory) notFound();

  const page = parseInt(pageStr);
  if (!Number.isFinite(page) || !/^\d+$/.test(pageStr) || page < 1) notFound();
  if (page === 1) permanentRedirect(categoryPageHref(category, 1, 'latest'));

  return <CategoryArchive category={category} page={page} sort="latest" />;
}

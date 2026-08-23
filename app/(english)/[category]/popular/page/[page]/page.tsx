import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import { CategoryArchive, categoryPageHref } from '@/components/CategoryArchive';
import { CATEGORIES, getCategoryLabel } from '@/lib/types';

export const revalidate = 21600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ category: string; page: string }>;
}

export function generateStaticParams() {
  return [] as { category: string; page: string }[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, page: pageStr } = await params;
  const page = parseInt(pageStr);
  if (!Number.isFinite(page) || page < 2) return {};
  const label = getCategoryLabel(category);

  return {
    title: `Most Read in ${label} — Page ${page}`,
    description: `The most read ${label} stories on Catzye, page ${page}.`,
    alternates: { canonical: `${BASE}/${category}` },
    robots: { index: false, follow: true },
  };
}

export default async function CategoryPopularPaginatedPage({ params }: Props) {
  const { category, page: pageStr } = await params;

  const validCategory = CATEGORIES.find((c) => c.slug === category);
  if (!validCategory) notFound();

  const page = parseInt(pageStr);
  if (!Number.isFinite(page) || !/^\d+$/.test(pageStr) || page < 1) notFound();
  if (page === 1) permanentRedirect(categoryPageHref(category, 1, 'popular'));

  return <CategoryArchive category={category} page={page} sort="popular" />;
}

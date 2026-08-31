import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import {
  CategoryArchive,
  categoryPageHref,
  CATEGORY_PAGE_SIZE,
} from '@/components/CategoryArchive';
import { CATEGORIES, getCategoryLabel } from '@/lib/types';
import { prisma } from '@/lib/db';

// Paginated archives are cut from a frozen edition, so they change only on
// deploy. See the note on the article route.
export const revalidate = false;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ category: string; page: string }>;
}

// The archive is a checked-in file, so every page number that exists is known
// here — there is no moving publish count. Enumerating them prerenders the whole
// paginated archive as static files; previously nothing was prerendered and each
// page cost a function invocation plus an ISR write on first crawl, and another
// pair every six hours after that.
export async function generateStaticParams() {
  const counts = await prisma.article.groupBy({
    by: ['category'],
    where: { published: true },
    _count: { _all: true },
  });
  const params: { category: string; page: string }[] = [];
  for (const { category, _count } of counts) {
    if (!CATEGORIES.some((c) => c.slug === category)) continue;
    const pages = Math.ceil(_count._all / CATEGORY_PAGE_SIZE);
    // Page 1 lives at the unpaginated URL and is redirected away below.
    for (let page = 2; page <= pages; page++) {
      params.push({ category, page: String(page) });
    }
  }
  return params;
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

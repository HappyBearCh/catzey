import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  CategoryArchive,
  CATEGORY_DESCRIPTIONS,
} from '@/components/CategoryArchive';
import { CATEGORIES, getCategoryLabel } from '@/lib/types';

export const revalidate = 1800;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = getCategoryLabel(category);
  const description = CATEGORY_DESCRIPTIONS[category] ?? `Latest ${label} manga and anime news and updates.`;
  const ogImage = `/og?title=${encodeURIComponent('Most Read ' + label)}&category=${category}`;

  return {
    title: `Most Read ${label} News`,
    description: `The most read ${label} stories on Catzye. ${description}`,
    // Same articles as /${category} in a different order, so the ranking view
    // points its canonical at the primary archive rather than competing with it.
    alternates: { canonical: `${BASE}/${category}` },
    robots: { index: false, follow: true },
    openGraph: {
      title: `Most Read ${label} News | Catzye`,
      description,
      url: `${BASE}/${category}/popular`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Most Read ${label} News | Catzye`,
      description,
      images: [ogImage],
    },
  };
}

export function generateStaticParams() {
  return CATEGORIES.map(({ slug }) => ({ category: slug }));
}

export default async function CategoryPopularPage({ params }: Props) {
  const { category } = await params;

  const validCategory = CATEGORIES.find((c) => c.slug === category);
  if (!validCategory) notFound();

  return <CategoryArchive category={category} page={1} sort="popular" />;
}

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  CategoryArchive,
  CATEGORY_DESCRIPTIONS,
} from '@/components/CategoryArchive';
import { CATEGORIES, getCategoryLabel } from '@/lib/types';
import { metaDescription, openGraph, twitter } from '@/lib/seo';

export const revalidate = 21600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = getCategoryLabel(category);
  const description = CATEGORY_DESCRIPTIONS[category] ?? `Everything Catzye files under ${label}.`;
  const ogImage = `/og?title=${encodeURIComponent('Most Read ' + label)}&category=${category}`;

  return {
    title: `Most Read in ${label}`,
    description: metaDescription(`The most read ${label} stories on Catzye. ${description}`),
    // Same articles as /${category} in a different order. It used to carry both
    // a noindex and a canonical pointing at the primary archive, which are
    // contradictory instructions — Google can follow the canonical and apply
    // the noindex to the target. The noindex is the one that expresses the
    // intent, so the cross-URL canonical goes.
    robots: { index: false, follow: true },
    openGraph: openGraph({
      title: `Most Read in ${label} | Catzye`,
      description,
      url: `${BASE}/${category}/popular`,
      image: ogImage,
    }),
    twitter: twitter({ title: `Most Read in ${label} | Catzye`, description, image: ogImage }),
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

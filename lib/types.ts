export interface ReviewData {
  chapterNumber?: string;
  story?: number;
  art?: number;
  pacing?: number;
  characters?: number;
  overall?: number;
  verdict?: string;
}

export interface Series {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  category: string;
  topics: string[];
  synopsis: string | null;
  status: string | null;
  genres: string[];
  externalUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  imageUrl: string | null;
  imageAlt?: string | null;
  imageCredit?: string | null;
  category: string;
  source: string;
  sourceUrl: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  scheduledAt: Date | null;
  views: number;
  tags: string[];
  entities: string[];
  pullQuote: string | null;
  editorNote: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviewData: any;
  seriesId: string | null;
  seriesOrder: number | null;
  // Written by a generation API (Gemini, or Claude through the API) before the
  // rule that every text on Catzye is written by hand. Kept readable at its URL,
  // but out of the index, the sitemap, the feeds and the front page.
  generated?: boolean;
  /** excerpt as written, before scripts/numerologize.ts led it with the number. */
  excerptSource?: string;
}

export const CATEGORIES = [
  { label: 'Manga', slug: 'manga' },
  { label: 'Anime', slug: 'anime' },
  { label: 'Industry', slug: 'industry' },
  { label: 'Reviews', slug: 'reviews' },
  { label: 'Light Novels', slug: 'light-novels' },
  { label: 'Manhwa', slug: 'manhwa' },
  { label: 'Events', slug: 'events' },
  { label: 'Creators', slug: 'creators' },
  { label: 'Shonen', slug: 'shonen' },
  { label: 'Seinen', slug: 'seinen' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

// The sections that actually hold texts, and so have an archive, a feed and a
// place in the navigation. The other seven slugs survive only as the home of a
// hand-written guide at /{slug}/guide; their empty archives redirect there
// (next.config.ts).
const ARCHIVE_SLUGS: readonly CategorySlug[] = ['manga', 'anime', 'industry'];
export const ARCHIVE_CATEGORIES = CATEGORIES.filter((c) => ARCHIVE_SLUGS.includes(c.slug));
export const GUIDE_ONLY_CATEGORIES = CATEGORIES.filter((c) => !ARCHIVE_SLUGS.includes(c.slug));

export function getCategoryLabel(slug: string): string {
  const known = CATEGORIES.find((c) => c.slug === slug);
  if (known) return known.label;
  // "numerology" is a real category on 300-odd essays but is not one of the ten
  // nav categories, so it fell through as a bare lowercase slug — into the
  // visible breadcrumb and into the BreadcrumbList name with it.
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function normalizeCategorySlug(raw: string): CategorySlug {
  const lower = raw.toLowerCase().trim();
  const match = CATEGORIES.find(
    (c) => c.slug === lower || c.label.toLowerCase() === lower,
  );
  return match?.slug ?? 'manga';
}

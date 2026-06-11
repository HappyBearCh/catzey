export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  imageUrl: string | null;
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

export function getCategoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function normalizeCategorySlug(raw: string): CategorySlug {
  const lower = raw.toLowerCase().trim();
  const match = CATEGORIES.find(
    (c) => c.slug === lower || c.label.toLowerCase() === lower,
  );
  return match?.slug ?? 'manga';
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  titleBs: string | null;
  contentBs: string | null;
  excerptBs: string | null;
  slug: string;
  imageUrl: string | null;
  category: string;
  source: string;
  sourceUrl: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  displayLang: string;
  published: boolean;
  scheduledAt: Date | null;
  views: number;
  tags: string[];
  entities: string[];
}

export const CATEGORIES = [
  { label: 'Manga', labelBs: 'Manga', slug: 'manga' },
  { label: 'Anime', labelBs: 'Anime', slug: 'anime' },
  { label: 'Industry', labelBs: 'Industrija', slug: 'industry' },
  { label: 'Reviews', labelBs: 'Recenzije', slug: 'reviews' },
  { label: 'Light Novels', labelBs: 'Light Novele', slug: 'light-novels' },
  { label: 'Manhwa', labelBs: 'Manhwa', slug: 'manhwa' },
  { label: 'Events', labelBs: 'Događaji', slug: 'events' },
  { label: 'Creators', labelBs: 'Kreatori', slug: 'creators' },
  { label: 'Shonen', labelBs: 'Shonen', slug: 'shonen' },
  { label: 'Seinen', labelBs: 'Seinen', slug: 'seinen' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export function getCategoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function getCategoryLabelBs(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.labelBs ?? slug;
}

export function bsArticle(article: Article): Article {
  return {
    ...article,
    title: article.titleBs || article.title,
    excerpt: article.excerptBs || article.excerpt,
    content: article.contentBs || article.content,
  };
}

export function normalizeCategorySlug(raw: string): CategorySlug {
  const lower = raw.toLowerCase().trim();
  const match = CATEGORIES.find(
    (c) => c.slug === lower || c.label.toLowerCase() === lower,
  );
  return match?.slug ?? 'manga';
}

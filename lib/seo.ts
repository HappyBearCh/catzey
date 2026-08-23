import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';
export const SITE_NAME = 'Catzye';

// Next merges metadata one key deep: a route that declares `openGraph` replaces
// the root layout's object outright rather than extending it, so every page
// that set a title and a url silently dropped siteName, locale, type and — on
// the pages that set no images of their own — the default share image too. The
// homepage was sharing with no og:image at all. Build the block through this
// helper instead of writing the literal, and the defaults always survive.
interface OgInput {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

export const DEFAULT_OG_IMAGE = '/og?title=Catzye%20%E2%80%94%20Learn%20Manga';

export function openGraph(input: OgInput = {}): NonNullable<Metadata['openGraph']> {
  const image = input.image ?? DEFAULT_OG_IMAGE;
  return {
    siteName: SITE_NAME,
    locale: 'en_US',
    type: input.type ?? 'website',
    ...(input.title && { title: input.title }),
    ...(input.description && { description: input.description }),
    ...(input.url && { url: input.url }),
    images: [{ url: image, width: 1200, height: 630, alt: input.title ?? 'Catzye' }],
    ...(input.type === 'article' && {
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime,
      authors: input.authors,
      section: input.section,
      tags: input.tags,
    }),
  } as NonNullable<Metadata['openGraph']>;
}

export function twitter(input: OgInput = {}): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    ...(input.title && { title: input.title }),
    ...(input.description && { description: input.description }),
    images: [input.image ?? DEFAULT_OG_IMAGE],
  };
}

// Google renders roughly 155–160 characters of a description and rewrites the
// snippet itself when the tag runs long, which loses the wording we chose. Trim
// on a word boundary and keep the sentence readable rather than shipping a
// 380-character excerpt and hoping.
export function metaDescription(text: string | null | undefined, limit = 158): string {
  const clean = (text ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > limit * 0.6 ? lastSpace : limit).replace(/[,;:.\-–—]$/, '')}…`;
}

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/icons/icon-512.png`, width: 512, height: 512 },
  description:
    'A reference to how manga works — explainers, a glossary, and entries on series and creators — arranged by the number each title reduces to.',
  publishingPrinciples: `${SITE_URL}/editorial-policy`,
  // Populate these env vars with your public profile URLs to strengthen
  // entity / Knowledge Graph signals (e.g. https://x.com/catzye).
  sameAs: [
    process.env.NEXT_PUBLIC_TWITTER_URL,
    process.env.NEXT_PUBLIC_BLUESKY_URL,
    process.env.NEXT_PUBLIC_REDDIT_URL,
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_YOUTUBE_URL,
  ].filter(Boolean) as string[],
};

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

export function breadcrumbLd(trail: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: t.url,
    })),
  };
}

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

// A one-line definition fills half a snippet, and Google fills a short tag
// from wherever on the page it likes. Follow the lead with the next sentences
// we wrote, whole ones while they fit; if the snippet is still short, the
// first one that did not fit ends it, trimmed on a word.
const SNIPPET_FULL = 120;
// Below this a snippet reads as unfinished, and a trimmed sentence is better.
const SNIPPET_SHORT = 105;
export function fullerDescription(lead: string, ...more: (string | null | undefined)[]): string {
  const clean = (t: string) => t.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
  let out = clean(lead);
  if (out.length >= SNIPPET_FULL) return metaDescription(out);
  if (!/[.!?…]$/.test(out)) out += '.';
  let overflow = '';
  for (const text of more) {
    if (!text) continue;
    // Split after a full stop that ends a sentence, not "No." or "Vol.".
    for (const sentence of clean(text).split(/(?<=(?<!\b(?:No|Vol|vs|Mr|Dr|St))[.!?])\s+(?=[A-Z0-9“"‘(])/)) {
      if (out.includes(sentence)) continue;
      if (out.length + 1 + sentence.length > 158) {
        // Skipping it would leave the next sentence without what it refers to.
        overflow ||= sentence;
        break;
      }
      out += ` ${sentence}`;
    }
  }
  return out.length < SNIPPET_SHORT && overflow ? metaDescription(`${out} ${overflow}`) : out;
}

/** The prose of a reference body, without the reading apparatus or headings. */
export function bodyProse(bodyHtml: string): string {
  return [...bodyHtml.replace(/<!--catzye:(\w+)-->[\s\S]*?<!--\/catzye:\1-->/g, '').matchAll(/<p([^>]*)>([\s\S]*?)<\/p>/g)]
    .filter(([, attrs]) => !/num-/.test(attrs))
    .map(([, , inner]) => inner)
    .join(' ');
}

const RESULT_TITLE_MAX = 60;

/**
 * The <title> for an essay. Google shows about sixty characters, and most
 * essay headlines run longer, so the results page cut them mid-phrase or
 * rewrote them. In order of preference: the headline with its part number
 * moved to the end; the headline alone; then, for a two-part headline, the
 * half after the colon, which is where these essays name the work they read
 * ("Spirited Away and the Villain Who Was a Numerologist"); then the half
 * before it. Failing all of those, the headline goes out whole and Google
 * trims it. The page's own h1 keeps the full headline either way.
 */
// Headlines whose halves are each too long or too vague to stand alone,
// shortened by hand. Keyed by slug.
const RESULT_TITLES: Record<string, string> = {
  'part-274-the-rarest-number-march-comes-in-like-a-lion-and-the-boy-who-could-not-':
    'March Comes in Like a Lion and the Rarest Number in Manga',
  'part-275-hardness-3-5-land-of-the-lustrous-and-the-numbers-of-a-body-that-will-n':
    'Land of the Lustrous and a Body That Will Not Hold',
  'part-277-the-triple-nine-takehiko-inoue-real-and-the-sports-manga-that-refuses-t':
    'Real and the Sports Manga That Refuses to Be Inspiring',
  'part-296-the-master-teacher-parasyte-the-number-33-and-the-alien-that-taught-a-b':
    'Parasyte and the Alien That Taught a Boy What a Human Is',
  'part-6-the-shelf-is-a-self-portrait-you-assemble-from-other-people-s-products':
    'The Shelf Is a Self-Portrait: Collecting Manga (Part 6)',
};

export function essayTitle(title: string, slug?: string): string {
  if (slug && RESULT_TITLES[slug]) return RESULT_TITLES[slug];
  const m = title.match(/^Part (\d+):\s*(.+)$/);
  const headline = m ? m[2] : title;
  const fits = (t: string) => t.length <= RESULT_TITLE_MAX;
  // A few headlines set their two halves apart with a dash instead of a colon.
  const sep = [': ', ' – ', ' — '].find((s) => headline.includes(s)) ?? ': ';
  const [before, ...rest] = headline.split(sep);
  const after = rest.join(sep);
  const candidates = [
    m ? `${headline} (Part ${m[1]})` : headline,
    headline,
    after.length >= 20 ? after : '',
    after && before.length >= 20 ? before : '',
  ];
  return candidates.find((t) => t && fits(t)) ?? headline;
}

// Google asks an Article for an image, a date and an author. A page with no
// photograph of its own still has the drawn share card its metadata gives it,
// and a page with no byline is written by the reference itself.
export function ogImageFor(title: string): string {
  return `${SITE_URL}/og?title=${encodeURIComponent(title)}`;
}

export const ORGANIZATION_AUTHOR = { '@type': 'Organization', name: SITE_NAME, url: SITE_URL } as const;

/**
 * An essay's JSON-LD headline. Google cuts one past 110 characters, so a longer
 * headline goes out as its search title, or failing that cut on a word.
 */
export function essayHeadline(title: string, slug: string): string {
  if (title.length <= 110) return title;
  const short = essayTitle(title, slug);
  if (short.length <= 110) return short;
  return short.slice(0, short.lastIndexOf(' ', 110)).replace(/[,;:–—-]$/, '').trim();
}

/** An essay as an item of a hub's JSON-LD. */
export function essayLdRef(a: { title: string; slug: string; publishedAt: Date | string; imageUrl: string | null }) {
  return {
    '@type': 'Article',
    headline: essayHeadline(a.title, a.slug),
    url: `${SITE_URL}/article/${a.slug}`,
    image: a.imageUrl ?? ogImageFor(a.title),
    datePublished: new Date(a.publishedAt).toISOString(),
  };
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

// The root layout appends " | Catzye". Google shows about 60 characters of a
// title, so on a long title the suffix would push the end of the title itself
// out of view; those titles go out alone instead.
const TITLE_SUFFIX = ' | Catzye';
const TITLE_LIMIT = 62;
export function documentTitle(title: string): NonNullable<Metadata['title']> {
  return title.length + TITLE_SUFFIX.length <= TITLE_LIMIT ? title : { absolute: title };
}

// A subtitle alone is too short to describe a guide in search results; adding
// the guide's opening paragraph gives the snippet something to say.
export function guideDescription(subtitle: string, bodyHtml: string): string {
  // Skip the reading apparatus (num-standfirst and friends) that
  // scripts/numerologize.ts puts at the top of a body.
  const withoutReading = bodyHtml.replace(/<!--catzye:(\w+)-->[\s\S]*?<!--\/catzye:\1-->/g, '');
  const firstParagraph =
    [...withoutReading.matchAll(/<p([^>]*)>([\s\S]*?)<\/p>/g)].find(([, attrs]) => !/num-/.test(attrs))?.[2] ?? '';
  const lead = subtitle.replace(/[.\s]+$/, '');
  return metaDescription(`${lead}. ${firstParagraph}`);
}

// A tag or topic hub is a list of other pages plus a sentence of framing. With
// two essays behind it, it rendered about 200 words and competed in the index
// with the essays it lists; three is the point where the hub says something
// the essays alone do not. Every place that decides a hub's indexability — the
// pages, the sitemap, prerendering and the tag/topic de-duplication — reads it
// from here, so they cannot drift apart.
export const HUB_MIN_TEXTS = 3;

// scripts/numerologize.ts appends the title reading to every reference body
// between <!--catzye:reading--> markers. Pages split it off so the entry's own
// content and quick answers come first and the reading follows them.
export function splitReading(html: string): { body: string; reading: string } {
  const match = html.match(/<!--catzye:reading-->[\s\S]*?<!--\/catzye:reading-->/);
  if (!match) return { body: html, reading: '' };
  return { body: html.replace(match[0], ''), reading: match[0] };
}

// A tag label is
// stored as typed — often lower case — so titles capitalise the first letter.
export function capitalise(label: string): string {
  return label.charAt(0).toUpperCase() + label.slice(1);
}

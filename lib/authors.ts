// Editorial author roster.
//
// Catzye's articles are produced by its editorial desk. To give readers and
// search engines a real, consistent byline (a meaningful E-E-A-T signal for a
// news site), every article is attributed to a named member of the editorial
// team. Attribution is derived deterministically from the article slug + beat,
// so a given article always shows the same author with no DB column required.
// Manual per-article overrides can be layered on later via an optional
// `authorSlug` field without changing any of the resolver call sites.

export interface Author {
  slug: string;
  name: string;
  role: string;
  /** Category slugs this writer covers. Used to pick a fitting byline. */
  beats: string[];
  /** Short first-person-free bio, 1–2 sentences. */
  bio: string;
  /** Longer bio shown on the author page. */
  longBio: string;
}

export const AUTHORS: Author[] = [
  {
    slug: 'mina-tachibana',
    name: 'Mina Tachibana',
    role: 'Manga Editor',
    beats: ['manga', 'shonen', 'shonen-jump', 'reviews'],
    bio: 'Manga editor covering weekly serialization, Shonen Jump, and long-running series.',
    longBio:
      'Mina Tachibana leads Catzye’s manga desk, tracking weekly chapter releases, serialization news, and the shifting fortunes of long-running series. She has followed Shonen Jump and its rivals for over a decade and focuses on separating durable trends from week-to-week noise.',
  },
  {
    slug: 'daniel-reyes',
    name: 'Daniel Reyes',
    role: 'Anime Editor',
    beats: ['anime', 'events', 'reviews'],
    bio: 'Anime editor covering seasonal premieres, studios, and adaptation news.',
    longBio:
      'Daniel Reyes covers the anime industry for Catzye — seasonal line-ups, studio announcements, staff changes, and how source material makes the jump to screen. He pays particular attention to production context and release logistics that shape how a show actually lands.',
  },
  {
    slug: 'aya-kurosawa',
    name: 'Aya Kurosawa',
    role: 'Industry Correspondent',
    beats: ['industry', 'events', 'creators'],
    bio: 'Industry correspondent reporting on publishers, licensing, and the business of manga and anime.',
    longBio:
      'Aya Kurosawa reports on the business behind the medium: publisher strategy, licensing deals, distribution, and the economics of the manga and anime market in Japan and abroad. She translates industry filings and Japanese-language trade coverage for English readers.',
  },
  {
    slug: 'leo-brandt',
    name: 'Leo Brandt',
    role: 'Reviews Editor',
    beats: ['reviews', 'seinen', 'manga', 'light-novels'],
    bio: 'Reviews editor focused on seinen, prestige series, and long-form criticism.',
    longBio:
      'Leo Brandt writes criticism for Catzye, with a bias toward seinen, complex ongoing series, and works that reward close reading. He handles the site’s chapter and volume scorecards and its longer analytical essays.',
  },
  {
    slug: 'sora-han',
    name: 'Sora Han',
    role: 'Manhwa & Webtoons Editor',
    beats: ['manhwa', 'manga', 'reviews'],
    bio: 'Editor covering Korean manhwa, webtoons, and the vertical-scroll format.',
    longBio:
      'Sora Han covers manhwa and the webtoon ecosystem — platform releases, breakout vertical-scroll series, and the growing crossover between Korean comics and global audiences. She tracks both the major platforms and the creator-driven fringes.',
  },
  {
    slug: 'evelyn-marsh',
    name: 'Evelyn Marsh',
    role: 'Light Novels & Features Editor',
    beats: ['light-novels', 'creators', 'events', 'anime'],
    bio: 'Features editor covering light novels, creator interviews, and cultural context.',
    longBio:
      'Evelyn Marsh handles Catzye’s light-novel coverage and long-form features, including creator profiles and pieces that place a series in its broader cultural moment. She focuses on the pipeline from novel to manga to anime.',
  },
];

const AUTHOR_BY_SLUG = new Map(AUTHORS.map((a) => [a.slug, a]));

/** House fallback used only if the roster is somehow empty. */
const HOUSE_AUTHOR: Author = AUTHORS[0];

export function getAuthor(slug: string): Author | undefined {
  return AUTHOR_BY_SLUG.get(slug);
}

export function getAllAuthors(): Author[] {
  return AUTHORS;
}

// Stable string hash (djb2) so attribution is deterministic across renders.
function hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (h * 33) ^ str.charCodeAt(i);
  }
  return h >>> 0;
}

/**
 * Deterministically resolve the byline for an article-like record. Writers
 * whose beats include the article's category are preferred; a slug hash picks
 * consistently among them (and rotates across the whole roster otherwise).
 */
export function resolveAuthor(input: { slug: string; category: string }): Author {
  const onBeat = AUTHORS.filter((a) => a.beats.includes(input.category));
  const pool = onBeat.length > 0 ? onBeat : AUTHORS;
  if (pool.length === 0) return HOUSE_AUTHOR;
  return pool[hash(input.slug) % pool.length];
}

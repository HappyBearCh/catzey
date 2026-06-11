import axios from 'axios';
import { load } from 'cheerio';
import slugify from 'slugify';
import { put } from '@vercel/blob';
import { prisma } from './db';
import { summarizeAndTranslate } from './translator';
import { normalizeCategorySlug } from './types';
import { findImages, type ImageCandidate } from './imageSearch';

const HTTP_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8',
};

const RSS_HEADERS = {
  ...HTTP_HEADERS,
  Accept: 'application/rss+xml,application/xml,text/xml,*/*;q=0.8',
};

function cleanText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

// ─── RSS Feed definitions ─────────────────────────────────────────────────────

const RSS_FEEDS = [
  {
    // Anime News Network — premier English manga/anime news outlet
    url: 'https://www.animenewsnetwork.com/all/rss.xml',
    source: 'Anime News Network',
    defaultCategory: 'manga',
  },
  {
    // MyAnimeList News — largest anime/manga community news feed
    url: 'https://myanimelist.net/rss/news.xml',
    source: 'MyAnimeList',
    defaultCategory: 'anime',
  },
  {
    // Bleeding Cool — comics and manga industry news
    url: 'https://bleedingcool.com/feed/',
    source: 'Bleeding Cool',
    defaultCategory: 'industry',
  },
  {
    // The Beat — comics journalism covering manga licensing and releases
    url: 'https://www.comicsbeat.com/feed/',
    source: 'The Beat',
    defaultCategory: 'manga',
  },
  {
    // ICv2 — trade news for manga, anime, and comics industry
    url: 'https://icv2.com/articles/news/rss.xml',
    source: 'ICv2',
    defaultCategory: 'industry',
  },
];

// ─── Category mapping for manga/anime news terms ─────────────────────────────

const CAT_MAP: Record<string, string> = {
  manga: 'manga',
  'manga-news': 'manga',
  'new-manga': 'manga',
  releases: 'manga',
  'manga-releases': 'manga',
  anime: 'anime',
  'anime-news': 'anime',
  'anime-preview': 'anime',
  adaptation: 'anime',
  industry: 'industry',
  licensing: 'industry',
  'manga-industry': 'industry',
  'business-news': 'industry',
  sales: 'industry',
  review: 'reviews',
  reviews: 'reviews',
  'manga-reviews': 'reviews',
  'anime-reviews': 'reviews',
  'light-novel': 'light-novels',
  'light-novels': 'light-novels',
  'novel-news': 'light-novels',
  manhwa: 'manhwa',
  manhua: 'manhwa',
  'korean-comics': 'manhwa',
  event: 'events',
  events: 'events',
  convention: 'events',
  'anime-convention': 'events',
  'manga-event': 'events',
  creator: 'creators',
  creators: 'creators',
  mangaka: 'creators',
  artist: 'creators',
  author: 'creators',
  interview: 'creators',
  shonen: 'shonen',
  shounen: 'shonen',
  'shonen-manga': 'shonen',
  seinen: 'seinen',
  josei: 'seinen',
  'seinen-manga': 'seinen',
};

function mapCategory(raw: string, defaultCat: string): string {
  const lower = raw.toLowerCase().trim();
  return CAT_MAP[lower] ?? normalizeCategorySlug(lower) ?? defaultCat;
}

function categoryFromUrl(url: string, defaultCat: string): string {
  try {
    const parts = new URL(url).pathname.split('/').filter(Boolean);
    for (const part of parts) {
      const mapped = CAT_MAP[part.toLowerCase()];
      if (mapped) return mapped;
    }
  } catch { /* ignore */ }
  return defaultCat;
}


// ─── RSS parser ───────────────────────────────────────────────────────────────

interface RssItem {
  url: string;
  title: string;
  description: string;
  imageUrl: string | null;
  category: string;
  pubDate: Date | null;
}

async function fetchRssFeed(
  feedUrl: string,
  defaultCategory: string,
  limit = 5,
): Promise<RssItem[]> {
  console.log(`[scraper] Fetching RSS: ${feedUrl}`);
  const response = await axios.get(feedUrl, {
    timeout: 15000,
    headers: RSS_HEADERS,
    responseType: 'text',
  });

  const $ = load(response.data, { xmlMode: true });
  const items: RssItem[] = [];

  $('item').each((_, el) => {
    if (items.length >= limit) return;

    const rawTitle = cleanText($(el).find('title').first().text());
    const title = rawTitle.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();

    // Link can be in <link> text or <guid> or <feedburner:origLink>
    let url =
      cleanText($(el).find('link').first().text()) ||
      $(el).find('guid').first().text() ||
      '';
    url = url.trim();
    if (!url || !url.startsWith('http')) return;

    // Description / excerpt
    const desc = cleanText(
      $(el).find('description').first().text()
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim(),
    ).slice(0, 500);

    // Image: <enclosure>, <media:content>, or og:image in description html
    const imageUrl =
      $(el).find('enclosure[type^="image"]').attr('url') ??
      $(el).find('media\\:content, media\\:thumbnail').attr('url') ??
      null;

    // Category from <category> tag, or from URL
    const rawCat = cleanText($(el).find('category').first().text());
    const category = rawCat
      ? mapCategory(rawCat, defaultCategory)
      : categoryFromUrl(url, defaultCategory);

    // pubDate
    let pubDate: Date | null = null;
    try {
      const pd = $(el).find('pubDate').first().text();
      if (pd) pubDate = new Date(pd);
    } catch { /* ignore */ }

    // Skip sponsored/ad entries that sometimes appear in RSS feeds
    const isAd =
      /\b(oglas|reklama|sponzor|sponsored|advertisement|partner)\b/i.test(title) ||
      /\/(oglas|reklama|sponsored|advertis)\//i.test(url);

    if (title && url && !isAd) {
      items.push({ url, title, description: desc, imageUrl, category, pubDate });
    }
  });

  return items;
}

// ─── Noise patterns to reject individual paragraphs ─────────────────────────

const JUNK_PATTERNS = [
  // Ads / sponsored
  /\b(advertisement|advertorial|sponsored|partner content)\b/i,
  // Social / newsletter calls
  /\b(follow us|like us|subscribe to our newsletter|sign up for)\b/i,
  /facebook\.com|twitter\.com|instagram\.com|tiktok\.com|youtube\.com/i,
  // Cookie / GDPR boilerplate
  /\b(cookie|privacy policy|terms of (use|service))\b/i,
  // "Read more" / related-article teasers
  /^(read more|see also|related:|also read|you may also like)/i,
  // Copyright lines
  /©|\(c\) \d{4}|all rights reserved/i,
  // Pure-URL paragraphs
  /^https?:\/\/\S+$/,
  // ANN source-specific boilerplate
  /discuss this in the forum/i,
  /this article has a correction/i,
  // Bleeding Cool boilerplate
  /bleeding cool is your\b/i,
  // Generic manga site boilerplate
  /\bclick here to read\b/i,
];

// Inline substrings to strip from content regardless of paragraph boundaries
const INLINE_BOILERPLATE = [
  /discuss this in the forum\.[^\n]*/gi,
  /this article has a correction\.[^\n]*/gi,
];

export function stripKnownBoilerplate(text: string): string {
  let result = text;
  for (const re of INLINE_BOILERPLATE) {
    result = result.replace(re, '');
  }
  // Collapse runs of blank lines left behind
  return result.replace(/\n{3,}/g, '\n\n').trim();
}

function isJunkParagraph(text: string): boolean {
  if (text.length < 40) return true;
  // Mostly uppercase → likely a banner/headline not body text
  const upper = (text.match(/[A-ZČĆŠĐŽ]/g) ?? []).length;
  if (upper / text.length > 0.5) return true;
  return JUNK_PATTERNS.some((re) => re.test(text));
}

// ─── Generic article content fetcher ─────────────────────────────────────────

async function fetchArticleContent(url: string): Promise<{ content: string; imageUrl: string | null }> {
  console.log(`[scraper] Fetching article page: ${url}`);
  let response;
  try {
    response = await axios.get(url, {
      timeout: 15000,
      headers: { ...HTTP_HEADERS, Referer: 'https://www.google.com/' },
    });
  } catch (err: unknown) {
    const status = (err as { response?: { status?: number } })?.response?.status;
    console.warn(`[scraper] Page fetch failed (${status ?? 'network'}) for ${url}`);
    return { content: '', imageUrl: null };
  }
  const $ = load(response.data);

  // Strip noise elements before any text extraction
  $(
    [
      'script', 'style', 'noscript', 'iframe',
      // Ad containers
      '.ad', '.ads', '.adsbygoogle', '[class*="advert"]', '[id*="advert"]',
      '[class*="reklam"]', '[id*="reklam"]', '[class*="oglas"]', '[id*="oglas"]',
      '[class*="banner"]', '[id*="banner"]', '[class*="promo"]',
      // Related / "read more" blocks
      '.related', '.related-articles', '.related-posts', '.see-also',
      '.more-news', '.takodje', '.preporucujemo', '[class*="related"]',
      '[class*="recommend"]', '[class*="suggest"]',
      // Social / share
      '[class*="share"]', '[class*="social"]', '[class*="follow"]',
      // Newsletter / subscription
      '[class*="newsletter"]', '[class*="subscri"]',
      // Layout chrome
      'nav', 'header', 'footer', 'aside', '.sidebar', '[class*="sidebar"]',
      '.comments', '#comments', '[class*="comment"]',
      // Cookie banners
      '[class*="cookie"]', '[id*="cookie"]', '[class*="gdpr"]',
    ].join(', ')
  ).remove();

  // Try progressively broader selectors for article body
  const CONTENT_SELECTORS = [
    '[itemprop="articleBody"]',
    '.article-body',
    '.article-content',
    '.article-text',
    '.entry-content',
    '.post-content',
    '.tekst',
    '.news-body',
    '.text-editor-article',
    '.elementor-widget-theme-post-content',
    'article',
    'main',
  ];

  let content = '';
  for (const sel of CONTENT_SELECTORS) {
    const el = $(sel).first();
    if (el.length) {
      const paragraphs = el
        .find('p')
        .map((_, p) => cleanText($(p).text()))
        .get()
        .filter((t) => !isJunkParagraph(t));
      if (paragraphs.length >= 2) {
        content = paragraphs.join('\n\n');
        break;
      }
    }
  }

  // Final fallback: all <p> tags from body
  if (!content) {
    content = $('p')
      .map((_, p) => cleanText($(p).text()))
      .get()
      .filter((t) => !isJunkParagraph(t))
      .slice(0, 25)
      .join('\n\n');
  }

  content = stripKnownBoilerplate(content);

  const imageUrl =
    $('meta[property="og:image"]').attr('content') ??
    $('[itemprop="articleBody"] img, .article-body img, article img').first().attr('src') ??
    null;

  return { content: cleanText(content), imageUrl };
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};

export async function mirrorImageToBlob(sourceUrl: string): Promise<string | null> {
  console.log(`[scraper] Downloading image: ${sourceUrl}`);
  try {
    const response = await axios.get(sourceUrl, {
      responseType: 'arraybuffer',
      timeout: 15000,
      headers: HTTP_HEADERS,
      maxContentLength: 10 * 1024 * 1024,
    });

    const rawCt = response.headers['content-type'];
    const contentType: string = (typeof rawCt === 'string' ? rawCt : '').split(';')[0].trim();
    if (!contentType.startsWith('image/')) {
      console.log(`[scraper] Image skipped (non-image content-type: ${contentType}): ${sourceUrl}`);
      return null;
    }

    const ext = MIME_TO_EXT[contentType] ?? sourceUrl.split('?')[0].split('.').pop()?.slice(0, 5) ?? 'jpg';
    const filename = `articles/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;

    console.log(`[scraper] Uploading image to Blob: ${filename}`);
    const blob = await put(filename, Buffer.from(response.data as ArrayBuffer), {
      access: 'public',
      contentType,
    });

    console.log(`[scraper] Image stored at: ${blob.url}`);
    return blob.url;
  } catch (err) {
    console.warn(`[scraper] Image mirror failed (${sourceUrl}): ${String(err)}`);
    return null;
  }
}

function generateSlug(title: string): string {
  return slugify(title, { lower: true, strict: true, trim: true }).substring(0, 80);
}

async function ensureUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let attempt = 0;
  while (true) {
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (!existing) return slug;
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }
}

export interface ScrapeResult {
  added: number;
  skipped: number;
  errors: string[];
}

// ─── Lite scraper: RSS titles + links only, no Gemini ────────────────────────

export async function runScrapingLite(): Promise<ScrapeResult> {
  const result: ScrapeResult = { added: 0, skipped: 0, errors: [] };
  console.log(`[scraper] ── Lite run started (${RSS_FEEDS.length} feeds) ──`);

  for (const feed of RSS_FEEDS) {
    try {
      const items = await fetchRssFeed(feed.url, feed.defaultCategory, 5);
      console.log(`[scraper] ${feed.source}: ${items.length} items in RSS`);

      for (const item of items) {
        try {
          const [inQueue, inArticles] = await Promise.all([
            prisma.scrapedItem.findUnique({ where: { sourceUrl: item.url } }),
            prisma.article.findUnique({ where: { sourceUrl: item.url } }),
          ]);
          if (inQueue || inArticles) {
            result.skipped++;
            continue;
          }
          await prisma.scrapedItem.create({
            data: {
              title: item.title,
              description: item.description || null,
              sourceUrl: item.url,
              source: feed.source,
              category: item.category,
              imageUrl: item.imageUrl,
              pubDate: item.pubDate,
              status: 'pending',
            },
          });
          result.added++;
        } catch (err) {
          result.errors.push(`${feed.source} ${item.url}: ${String(err)}`);
        }
      }
    } catch (err) {
      result.errors.push(`${feed.source} RSS: ${String(err)}`);
    }
  }

  console.log(`[scraper] ── Lite run done: added=${result.added} skipped=${result.skipped} errors=${result.errors.length} ──`);
  return result;
}

// ─── Process a single scraped item → full Article (used by admin) ─────────────

export { type ImageCandidate };

export async function processScrapeItemToArticle(item: {
  title: string;
  description?: string | null;
  sourceUrl: string;
  source: string;
  category: string;
  pubDate: Date | null;
}): Promise<
  { success: true; articleId: string; images: ImageCandidate[]; keywords: string[] } |
  { success: false; error: string }
> {
  try {
    const exists = await prisma.article.findUnique({ where: { sourceUrl: item.sourceUrl } });
    if (exists) return { success: true, articleId: exists.id, images: [], keywords: [] };

    const { content: fullContent } = await fetchArticleContent(item.sourceUrl);
    const content = fullContent.length >= 200
      ? fullContent
      : (item.description && item.description.length >= 80 ? item.description : '');
    if (!content) {
      return { success: false, error: `Too little content extracted (${fullContent.length} chars) — page may be blocked` };
    }

    console.log(`[scraper] Calling Gemini for "${item.title.substring(0, 60)}"…`);
    const processed = await summarizeAndTranslate({
      title: item.title,
      content,
      sourceUrl: item.sourceUrl,
      source: item.source,
    });

    // Generate slug and search for open-source images in parallel
    const [slug, images] = await Promise.all([
      ensureUniqueSlug(generateSlug(processed.title)),
      findImages(processed.keywords.length > 0 ? processed.keywords : [processed.title]),
    ]);

    const article = await prisma.article.create({
      data: {
        title: processed.title,
        content: processed.content,
        excerpt: processed.summary,
        slug,
        imageUrl: null, // admin will pick from image suggestions
        category: normalizeCategorySlug(item.category),
        source: item.source,
        sourceUrl: item.sourceUrl,
        published: false,
        publishedAt: item.pubDate ?? new Date(),
        tags: processed.keywords,
        entities: processed.entities,
        pullQuote: processed.pullQuote || null,
        editorNote: processed.editorNote || null,
      },
    });

    return { success: true, articleId: article.id, images, keywords: processed.keywords };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

interface RawArticle {
  url: string;
  source: string;
  title: string;
  content: string;
  imageUrl: string | null;
  category: string;
  pubDate?: Date | null;
}

async function processArticle(raw: RawArticle, result: ScrapeResult) {
  console.log(`[scraper] Processing: "${raw.title.substring(0, 70)}"`);

  if (!raw.title || raw.content.length < 80) {
    console.log(`[scraper] Skip (no content, ${raw.content.length} chars): ${raw.url}`);
    result.skipped++;
    return;
  }

  const exists = await prisma.article.findUnique({ where: { sourceUrl: raw.url } });
  if (exists) {
    console.log(`[scraper] Skip (duplicate): ${raw.url}`);
    result.skipped++;
    return;
  }

  console.log(`[scraper] Calling Gemini to rewrite + translate (${raw.content.length} chars)…`);
  const processed = await summarizeAndTranslate({
    title: raw.title,
    content: raw.content,
    sourceUrl: raw.url,
    source: raw.source,
  });
  console.log(`[scraper] Gemini done → EN title: "${processed.title.substring(0, 60)}"`);

  console.log(`[scraper] Mirroring image and generating slug…`);
  const [baseSlug, blobImageUrl] = await Promise.all([
    ensureUniqueSlug(generateSlug(processed.title)),
    raw.imageUrl ? mirrorImageToBlob(raw.imageUrl) : Promise.resolve(null),
  ]);
  const slug = baseSlug;

  console.log(`[scraper] Saving to DB (slug: ${slug}, image: ${blobImageUrl ? 'blob' : raw.imageUrl ? 'original' : 'none'})…`);
  await prisma.article.create({
    data: {
      title: processed.title,
      content: processed.content,
      excerpt: processed.summary,
      slug,
      imageUrl: blobImageUrl ?? raw.imageUrl,
      category: normalizeCategorySlug(raw.category),
      source: raw.source,
      sourceUrl: raw.url,
      published: false,
      publishedAt: raw.pubDate ?? new Date(),
      tags: processed.keywords,
      entities: processed.entities,
      pullQuote: processed.pullQuote || null,
      editorNote: processed.editorNote || null,
    },
  });

  result.added++;
  console.log(`[scraper] Added: "${processed.title.substring(0, 60)}…"`);
}

// ─── Main scraping run ────────────────────────────────────────────────────────

export async function runScraping(): Promise<ScrapeResult> {
  const result: ScrapeResult = { added: 0, skipped: 0, errors: [] };
  console.log(`[scraper] ── Run started (${RSS_FEEDS.length} feeds) ──`);

  for (const feed of RSS_FEEDS) {
    console.log(`[scraper] ── Feed: ${feed.source} ──`);
    try {
      const items = await fetchRssFeed(feed.url, feed.defaultCategory, 2);
      console.log(`[scraper] ${feed.source}: ${items.length} items found in RSS`);

      for (const item of items) {
        try {
          const { content: fullContent, imageUrl: pageImage } = await fetchArticleContent(item.url);
          const content = fullContent.length >= 200 ? fullContent : item.description;
          const imageUrl = pageImage ?? item.imageUrl;
          console.log(`[scraper] Content fetched: ${content.length} chars, image: ${imageUrl ? 'yes' : 'none'}`);

          await processArticle(
            {
              url: item.url,
              source: feed.source,
              title: item.title,
              content,
              imageUrl,
              category: item.category,
              pubDate: item.pubDate,
            },
            result,
          );
        } catch (err) {
          const msg = `${feed.source} ${item.url}: ${String(err)}`;
          console.error('[scraper] ERROR:', msg);
          result.errors.push(msg);
        }
      }
    } catch (err) {
      const msg = `${feed.source} RSS feed: ${String(err)}`;
      console.error('[scraper] ERROR:', msg);
      result.errors.push(msg);
    }
  }

  console.log(`[scraper] ── Run complete: added=${result.added} skipped=${result.skipped} errors=${result.errors.length} ──`);
  return result;
}

// ─── Manual URL scrape (used by admin "Generate from URL") ───────────────────

export async function scrapeArticleFromUrl(url: string): Promise<{
  title: string;
  content: string;
  imageUrl: string | null;
  category: string;
  source: string;
}> {
  const hostname = new URL(url).hostname.replace('www.', '');

  // Map hostname to friendly source name
  const SOURCE_NAMES: Record<string, string> = {
    'animenewsnetwork.com': 'Anime News Network',
    'myanimelist.net': 'MyAnimeList',
    'bleedingcool.com': 'Bleeding Cool',
    'comicsbeat.com': 'The Beat',
    'icv2.com': 'ICv2',
  };
  const source = SOURCE_NAMES[hostname] ?? hostname;

  const $ = load(
    (await axios.get(url, { timeout: 15000, headers: HTTP_HEADERS })).data,
  );
  const title = cleanText($('h1').first().text() || $('title').text());
  const { content, imageUrl } = await fetchArticleContent(url);
  const category = categoryFromUrl(url, 'manga');

  return { title, content, imageUrl, category, source };
}

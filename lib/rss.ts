import { titleValue, getGroup } from '@/lib/number-groups';

export interface RssArticle {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: Date;
  imageUrl: string | null;
  tags: string[];
}

export interface RssChannel {
  title: string;
  link: string;
  description: string;
  selfUrl: string;
  articles: RssArticle[];
}

export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';
const WEBSUB_HUB = process.env.WEBSUB_HUB ?? 'https://pubsubhubbub.appspot.com/';

export function buildRss(channel: RssChannel): string {
  const items = channel.articles
    .map((a) => {
      const url = `${BASE}/article/${a.slug}`;
      // A feed reader shows a title and a category list and nothing else, so the
      // shelf has to travel inside those or it does not travel at all. The
      // excerpt already leads with the number; these make it filterable.
      const shelf = titleValue(a.title);
      const categories = [a.category, ...a.tags, `Number ${shelf}`, getGroup(shelf).shelf]
        .filter((t, i, all) => all.indexOf(t) === i)
        .map((t) => `<category>${esc(t)}</category>`)
        .join('');
      const media = a.imageUrl
        ? `<media:content url="${esc(a.imageUrl)}" medium="image" type="image/jpeg"/>` +
          `<media:thumbnail url="${esc(a.imageUrl)}"/>` +
          `<enclosure url="${esc(a.imageUrl)}" length="0" type="image/jpeg"/>`
        : '';
      return `
  <item>
    <title>${esc(a.title)}</title>
    <link>${url}</link>
    <description>${esc(a.excerpt)}</description>
    <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
    <guid isPermaLink="true">${url}</guid>
    ${categories}
    ${media}
  </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${esc(channel.title)}</title>
    <link>${channel.link}</link>
    <description>${esc(channel.description)}</description>
    <language>en</language>
    <ttl>30</ttl>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${channel.selfUrl}" rel="self" type="application/rss+xml"/>
    <atom:link href="${WEBSUB_HUB}" rel="hub"/>
    ${items}
  </channel>
</rss>`;
}

export const RSS_HEADERS = {
  'Content-Type': 'application/rss+xml; charset=utf-8',
  'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
} as const;

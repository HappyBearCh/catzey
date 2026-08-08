import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

export const maxDuration = 60;
export const runtime = 'nodejs';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

// ─── Bluesky ─────────────────────────────────────────────────────────────────

async function postToBluesky(title: string, articleUrl: string): Promise<boolean> {
  const handle = process.env.BLUESKY_HANDLE;
  const password = process.env.BLUESKY_APP_PASSWORD;
  if (!handle || !password) return false;

  try {
    const sessionRes = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: handle, password }),
    });
    if (!sessionRes.ok) return false;
    const { accessJwt, did } = await sessionRes.json();

    const truncated = title.length > 220 ? title.slice(0, 217) + '...' : title;
    const text = `${truncated}\n\n${articleUrl}`;
    const preUrl = `${truncated}\n\n`;
    const byteStart = Buffer.byteLength(preUrl, 'utf8');
    const byteEnd = byteStart + Buffer.byteLength(articleUrl, 'utf8');

    const res = await fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessJwt}` },
      body: JSON.stringify({
        repo: did,
        collection: 'app.bsky.feed.post',
        record: {
          $type: 'app.bsky.feed.post',
          text,
          createdAt: new Date().toISOString(),
          facets: [
            {
              index: { byteStart, byteEnd },
              features: [{ $type: 'app.bsky.richtext.facet#link', uri: articleUrl }],
            },
          ],
        },
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ─── Twitter / X (OAuth 1.0a) ────────────────────────────────────────────────

function oauthSign(
  method: string,
  url: string,
  oauthParams: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string,
): string {
  const sorted = Object.entries(oauthParams)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  const base = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(sorted)}`;
  const key = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;
  return crypto.createHmac('sha1', key).update(base).digest('base64');
}

async function postToTwitter(title: string, articleUrl: string): Promise<boolean> {
  const apiKey = process.env.TWITTER_API_KEY;
  const apiSecret = process.env.TWITTER_API_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
  if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) return false;

  try {
    const url = 'https://api.twitter.com/2/tweets';
    const truncated = title.length > 200 ? title.slice(0, 197) + '...' : title;
    const text = `${truncated}\n\n${articleUrl}\n\n#manga #anime`;

    const oauthParams: Record<string, string> = {
      oauth_consumer_key: apiKey,
      oauth_nonce: crypto.randomBytes(16).toString('hex'),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_token: accessToken,
      oauth_version: '1.0',
    };
    oauthParams.oauth_signature = oauthSign('POST', url, oauthParams, apiSecret, accessTokenSecret);

    const authHeader =
      'OAuth ' +
      Object.entries(oauthParams)
        .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
        .join(', ');

    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ─── Reddit (OAuth password flow) ────────────────────────────────────────────

const REDDIT_CATEGORY_SUBREDDITS: Record<string, string> = {
  manga: 'manga',
  anime: 'anime',
  manhwa: 'manhwa',
  'light-novels': 'lightnovels',
  industry: 'anime',
  reviews: 'anime',
  events: 'anime',
  creators: 'anime',
  shonen: 'Shonen',
  seinen: 'Seinen',
};

async function postToReddit(title: string, articleUrl: string, category: string): Promise<boolean> {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  const username = process.env.REDDIT_USERNAME;
  const password = process.env.REDDIT_PASSWORD;
  const subreddit = process.env.REDDIT_SUBREDDIT ?? REDDIT_CATEGORY_SUBREDDITS[category] ?? 'manga';
  if (!clientId || !clientSecret || !username || !password) return false;

  try {
    const tokenRes = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Catzye/1.0',
      },
      body: `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    });
    if (!tokenRes.ok) return false;
    const { access_token } = await tokenRes.json();

    const submitRes = await fetch('https://oauth.reddit.com/api/submit', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Catzye/1.0',
      },
      body: new URLSearchParams({
        kind: 'link',
        sr: subreddit,
        title,
        url: articleUrl,
        resubmit: 'false',
        nsfw: 'false',
        spoiler: 'false',
      }).toString(),
    });
    return submitRes.ok;
  } catch {
    return false;
  }
}

// ─── Cron handler ─────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Anything published but not yet announced. Unlike the previous "last N
  // minutes" window this neither misses articles when a run is skipped nor
  // reposts the ones that land on a window boundary — which matters now that
  // social and process share a cron slot.
  //
  // MAX_AGE_MS keeps a backlog (or a botched backfill of socialPostedAt) from
  // dumping the archive onto the timelines, and PER_RUN caps the burst rate.
  const MAX_AGE_MS = 24 * 60 * 60 * 1000;
  const PER_RUN = 12;

  let articles: { id: string; title: string; slug: string; category: string }[] = [];

  try {
    articles = await prisma.article.findMany({
      where: {
        published: true,
        socialPostedAt: null,
        publishedAt: { gte: new Date(Date.now() - MAX_AGE_MS) },
      },
      orderBy: { publishedAt: 'desc' },
      take: PER_RUN,
      select: { id: true, title: true, slug: true, category: true },
    });
  } catch (err) {
    return NextResponse.json({ error: 'DB error', detail: String(err) }, { status: 500 });
  }

  if (articles.length === 0) {
    return NextResponse.json({ ok: true, posted: 0, reason: 'nothing new to announce' });
  }

  const results: Record<string, { bluesky?: boolean; twitter?: boolean; reddit?: boolean }> = {};

  for (const article of articles) {
    const url = `${BASE}/article/${article.slug}`;
    const [bsky, tw, rd] = await Promise.all([
      postToBluesky(article.title, url),
      postToTwitter(article.title, url),
      postToReddit(article.title, url, article.category),
    ]);
    results[article.slug] = { bluesky: bsky, twitter: tw, reddit: rd };

    // Mark on any success. Retrying the whole article to catch one failed
    // network would repost it to the platforms that already accepted it.
    if (bsky || tw || rd) {
      await prisma.article
        .update({ where: { id: article.id }, data: { socialPostedAt: new Date() } })
        .catch(() => {});
    }
  }

  const posted = Object.values(results).filter((r) => r.bluesky || r.twitter || r.reddit).length;
  console.log(`[cron/social] Posted ${posted}/${articles.length} article(s)`, results);
  return NextResponse.json({ ok: true, posted, attempted: articles.length, results });
}

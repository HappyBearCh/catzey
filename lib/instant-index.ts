// Instant-indexing notifications for freshly published content.
//
// News ranking rewards being crawled within minutes, not hours. On publish we:
//   1. Submit the affected URLs to IndexNow (Bing, Yandex, and partners).
//   2. Ping a WebSub hub so feed subscribers/aggregators pull the new items.
//
// Everything here is best-effort and fire-and-forget: failures are swallowed so
// they can never block or fail a publish action.

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

// Must match the filename + contents of the key file in /public.
const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? 'd7f3b8a291e04c5f';

const WEBSUB_HUB = process.env.WEBSUB_HUB ?? 'https://pubsubhubbub.appspot.com/';

function hostname(): string {
  try {
    return new URL(BASE).hostname;
  } catch {
    return 'catzye.com';
  }
}

async function submitToIndexNow(urls: string[]): Promise<void> {
  if (urls.length === 0) return;
  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: hostname(),
        key: INDEXNOW_KEY,
        keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
        urlList: urls.slice(0, 10000),
      }),
    });
  } catch {
    // best-effort
  }
}

async function pingWebSub(): Promise<void> {
  try {
    const body = new URLSearchParams();
    body.append('hub.mode', 'publish');
    body.append('hub.url', `${BASE}/feed.xml`);
    await fetch(WEBSUB_HUB, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  } catch {
    // best-effort
  }
}

/** Notify search engines and feed subscribers about newly published article slugs. */
export async function notifyPublished(slugs: string[]): Promise<void> {
  const urls = Array.from(new Set(slugs.filter(Boolean))).map((s) => `${BASE}/article/${s}`);
  await Promise.allSettled([submitToIndexNow(urls), pingWebSub()]);
}

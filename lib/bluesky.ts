const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';
const BSKY_API = 'https://bsky.social/xrpc';

export async function postToBluesky({ title, excerpt, slug }: { title: string; excerpt: string; slug: string }) {
  const handle = process.env.BSKY_HANDLE;
  const password = process.env.BSKY_APP_PASSWORD;
  if (!handle || !password) return;

  // Create session
  const sessionRes = await fetch(`${BSKY_API}/com.atproto.server.createSession`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: handle, password }),
  });
  if (!sessionRes.ok) return;
  const { accessJwt, did } = await sessionRes.json();

  const url = `${BASE}/article/${slug}`;
  const text = `${title}\n\n${url}`;

  const record = {
    $type: 'app.bsky.feed.post',
    text,
    createdAt: new Date().toISOString(),
    embed: {
      $type: 'app.bsky.embed.external',
      external: {
        uri: url,
        title,
        description: excerpt.slice(0, 300),
      },
    },
    langs: ['en'],
  };

  await fetch(`${BSKY_API}/com.atproto.repo.createRecord`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessJwt}`,
    },
    body: JSON.stringify({
      repo: did,
      collection: 'app.bsky.feed.post',
      record,
    }),
  });
}

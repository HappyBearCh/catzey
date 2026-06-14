import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { searchFlickr } from '@/lib/imageSearch';

export const runtime = 'nodejs';
export const maxDuration = 300;

const DELAY_MS = 700;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  // Bearer token (curl / cron) — accept CRON_SECRET
  const auth = request.headers.get('authorization');
  const secret = process.env.CRON_SECRET;
  if (secret && auth === `Bearer ${secret}`) return true;

  // Session cookie (admin browser)
  const cookieStore = await cookies();
  const cookie = cookieStore.get('Catzye_admin')?.value;
  const password = process.env.ADMIN_PASSWORD ?? secret ?? '';
  return !!password && cookie === Buffer.from(password).toString('base64');
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.FLICKR_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'FLICKR_API_KEY is not set on Vercel. Add it via the Vercel dashboard → Settings → Environment Variables.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const articles = await prisma.article.findMany({
    where: { imageUrl: { contains: 'loc.gov' } },
    select: { id: true, title: true, tags: true },
    orderBy: { publishedAt: 'desc' },
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function send(obj: Record<string, unknown>) {
        controller.enqueue(encoder.encode(JSON.stringify(obj) + '\n'));
      }

      send({ type: 'start', total: articles.length });

      let replaced = 0;
      let kept = 0;
      let errors = 0;

      for (let i = 0; i < articles.length; i++) {
        const a = articles[i];

        const query = a.tags.length > 0
          ? a.tags.slice(0, 3).join(' ')
          : a.title.split(/\s+/).slice(0, 5).join(' ');

        try {
          let results = await searchFlickr(query, 5);

          if (results.length === 0) {
            // Retry with title words when tags produced nothing
            const titleQuery = a.title.split(/\s+/).slice(0, 4).join(' ');
            if (titleQuery !== query) {
              results = await searchFlickr(titleQuery, 5);
            }
          }

          if (results.length === 0) {
            kept++;
            send({ type: 'progress', i: i + 1, total: articles.length, title: a.title, status: 'kept', detail: 'no Flickr result' });
          } else {
            const photo = results[0];
            await prisma.article.update({
              where: { id: a.id },
              data: { imageUrl: photo.url, imageCredit: photo.credit },
            });
            replaced++;
            send({ type: 'progress', i: i + 1, total: articles.length, title: a.title, status: 'replaced', detail: photo.credit });
          }
        } catch (err) {
          errors++;
          send({ type: 'progress', i: i + 1, total: articles.length, title: a.title, status: 'error', detail: String(err).slice(0, 120) });
        }

        await sleep(DELAY_MS);
      }

      send({ type: 'done', replaced, kept, errors });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  });
}

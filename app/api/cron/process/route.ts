import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { processScrapeItemToArticle, mirrorImageToBlob } from '@/lib/scraper';
import { revalidatePath } from 'next/cache';
import { CATEGORIES } from '@/lib/types';
import { notifyPublished } from '@/lib/instant-index';

export const maxDuration = 300;
export const runtime = 'nodejs';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

// The cron now runs hourly rather than twice an hour, so each run takes a
// larger bite. Sized against the 300s budget below, not against the queue.
const BATCH_SIZE = 8;
// Stop claiming new work with enough runway left to finish the item in flight
// and release the rest. Keeps a slow batch from being killed mid-write.
const DEADLINE_MS = 240_000;
// A failed item is retried on later runs until it has burned this many attempts.
const MAX_RETRIES = 3;
// An item claimed longer ago than this belongs to a run that died; take it back.
const STUCK_AFTER_MS = 30 * 60 * 1000;

function revalidateSite() {
  revalidatePath('/');
  for (const { slug } of CATEGORIES) revalidatePath(`/${slug}`);
}

async function pingSitemaps() {
  const encoded = encodeURIComponent(`${BASE}/sitemap.xml`);
  await Promise.allSettled([
    fetch(`https://www.google.com/ping?sitemap=${encoded}`),
    fetch(`https://www.bing.com/ping?sitemap=${encoded}`),
  ]);
}

// Fresh items go first — news value decays — and retries only fill the slots
// left over, so a large error backlog can never crowd out today's headlines.
async function claimBatch() {
  const pending = await prisma.scrapedItem.findMany({
    where: { status: 'pending' },
    orderBy: { scrapedAt: 'asc' },
    take: BATCH_SIZE,
  });
  if (pending.length >= BATCH_SIZE) return pending;

  const retryable = await prisma.scrapedItem.findMany({
    where: { status: 'error', retries: { lt: MAX_RETRIES } },
    orderBy: [{ retries: 'asc' }, { scrapedAt: 'asc' }],
    take: BATCH_SIZE - pending.length,
  });
  return [...pending, ...retryable];
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const startedAt = Date.now();

  // Reclaim anything stranded by an earlier run before picking new work. Rows
  // predating the claimedAt column carry NULL and are reclaimed on sight.
  const reclaimed = await prisma.scrapedItem.updateMany({
    where: {
      status: 'processing',
      OR: [{ claimedAt: null }, { claimedAt: { lt: new Date(startedAt - STUCK_AFTER_MS) } }],
    },
    data: { status: 'pending', claimedAt: null },
  });
  if (reclaimed.count > 0) {
    console.log(`[cron/process] Reclaimed ${reclaimed.count} stranded item(s)`);
  }

  const items = await claimBatch();

  if (items.length === 0) {
    return NextResponse.json({ ok: true, processed: 0, reason: 'queue empty' });
  }

  // Claim items to prevent concurrent cron overlap
  await prisma.scrapedItem.updateMany({
    where: { id: { in: items.map((i) => i.id) } },
    data: { status: 'processing', claimedAt: new Date() },
  });

  let published = 0;
  let skipped = 0;
  const publishedSlugs: string[] = [];
  const errors: string[] = [];

  for (const [index, item] of items.entries()) {
    // Out of runway: hand the rest back so the next run picks them up rather
    // than letting the function be killed with items still marked processing.
    if (Date.now() - startedAt > DEADLINE_MS) {
      const rest = items.slice(index).map((i) => i.id);
      await prisma.scrapedItem.updateMany({
        where: { id: { in: rest } },
        data: { status: 'pending', claimedAt: null },
      });
      skipped = rest.length;
      console.log(`[cron/process] Deadline reached, released ${skipped} item(s)`);
      break;
    }

    try {
      const result = await processScrapeItemToArticle({
        title: item.title,
        description: item.description,
        sourceUrl: item.sourceUrl,
        source: item.source,
        category: item.category,
        pubDate: item.pubDate,
      });

      if (!result.success) {
        await prisma.scrapedItem.update({
          where: { id: item.id },
          data: { status: 'error', retries: { increment: 1 }, claimedAt: null },
        });
        errors.push(`${item.title.slice(0, 60)}: ${result.error}`);
        continue;
      }

      // Mirror RSS image to Vercel Blob, fall back to search candidate
      let imageUrl: string | null = item.imageUrl ?? result.images[0]?.url ?? null;
      if (imageUrl) {
        const blobUrl = await mirrorImageToBlob(imageUrl).catch(() => null);
        if (blobUrl) imageUrl = blobUrl;
      }

      const pub = await prisma.article.update({
        where: { id: result.articleId },
        data: {
          published: true,
          publishedAt: new Date(),
          ...(imageUrl && { imageUrl }),
        },
        select: { slug: true },
      });

      await prisma.scrapedItem.update({
        where: { id: item.id },
        data: { status: 'done', claimedAt: null },
      });
      published++;
      publishedSlugs.push(pub.slug);
      console.log(`[cron/process] Published: "${item.title.slice(0, 60)}"`);
    } catch (err) {
      await prisma.scrapedItem
        .update({
          where: { id: item.id },
          data: { status: 'error', retries: { increment: 1 }, claimedAt: null },
        })
        .catch(() => {});
      errors.push(`${item.title.slice(0, 60)}: ${String(err)}`);
    }
  }

  if (published > 0) {
    revalidateSite();
    await Promise.allSettled([notifyPublished(publishedSlugs), pingSitemaps()]);
  }

  return NextResponse.json({
    ok: true,
    processed: items.length - skipped,
    published,
    reclaimed: reclaimed.count || undefined,
    skipped: skipped || undefined,
    errors: errors.length > 0 ? errors : undefined,
  });
}

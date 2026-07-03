import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { processScrapeItemToArticle, mirrorImageToBlob } from '@/lib/scraper';
import { revalidatePath } from 'next/cache';
import { CATEGORIES } from '@/lib/types';
import { notifyPublished } from '@/lib/instant-index';

export const maxDuration = 300;
export const runtime = 'nodejs';

const BATCH_SIZE = 5;

function revalidateSite() {
  revalidatePath('/');
  for (const { slug } of CATEGORIES) revalidatePath(`/${slug}`);
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const items = await prisma.scrapedItem.findMany({
    where: { status: 'pending' },
    orderBy: { scrapedAt: 'asc' },
    take: BATCH_SIZE,
  });

  if (items.length === 0) {
    return NextResponse.json({ ok: true, processed: 0, reason: 'queue empty' });
  }

  // Claim items to prevent concurrent cron overlap
  await prisma.scrapedItem.updateMany({
    where: { id: { in: items.map((i) => i.id) } },
    data: { status: 'processing' },
  });

  let published = 0;
  const publishedSlugs: string[] = [];
  const errors: string[] = [];

  for (const item of items) {
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
        await prisma.scrapedItem.update({ where: { id: item.id }, data: { status: 'error' } });
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

      await prisma.scrapedItem.update({ where: { id: item.id }, data: { status: 'done' } });
      published++;
      publishedSlugs.push(pub.slug);
      console.log(`[cron/process] Published: "${item.title.slice(0, 60)}"`);
    } catch (err) {
      await prisma.scrapedItem.update({ where: { id: item.id }, data: { status: 'error' } }).catch(() => {});
      errors.push(`${item.title.slice(0, 60)}: ${String(err)}`);
    }
  }

  if (published > 0) {
    revalidateSite();
    await notifyPublished(publishedSlugs);
  }

  return NextResponse.json({
    ok: true,
    processed: items.length,
    published,
    errors: errors.length > 0 ? errors : undefined,
  });
}

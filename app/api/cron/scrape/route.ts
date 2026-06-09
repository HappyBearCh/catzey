import { NextRequest, NextResponse } from 'next/server';
import { runScrapingLite } from '@/lib/scraper';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { CATEGORIES } from '@/lib/types';

function revalidateSite() {
  revalidatePath('/');
  for (const { slug } of CATEGORIES) {
    revalidatePath(`/${slug}`);
  }
  revalidatePath('/admin');
}

// Lite scraper only fetches RSS titles/links — 60s is plenty
export const maxDuration = 60;
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  // Protect the endpoint — Vercel sends CRON_SECRET automatically in production
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const startTime = Date.now();
  console.log(`[cron/scrape] Starting scrape at ${new Date().toISOString()}`);

  try {
    // Auto-publish any scheduled articles whose time has arrived
    const now = new Date();
    const due = await prisma.article.findMany({
      where: { published: false, scheduledAt: { lte: now } },
      select: { id: true },
    });
    if (due.length > 0) {
      await prisma.article.updateMany({
        where: { id: { in: due.map((a) => a.id) } },
        data: { published: true, scheduledAt: null },
      });
      revalidateSite();
      console.log(`[cron/scrape] Auto-published ${due.length} scheduled article(s)`);
    }

    const result = await runScrapingLite();
    if (result.added > 0) revalidateSite();
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log(
      `[cron/scrape] Done in ${duration}s — added: ${result.added}, skipped: ${result.skipped}, errors: ${result.errors.length}`,
    );

    return NextResponse.json({
      success: true,
      duration: `${duration}s`,
      added: result.added,
      skipped: result.skipped,
      errors: result.errors,
    });
  } catch (err) {
    console.error('[cron/scrape] Fatal error:', err);
    return NextResponse.json(
      { error: 'Scraping failed', detail: String(err) },
      { status: 500 },
    );
  }
}

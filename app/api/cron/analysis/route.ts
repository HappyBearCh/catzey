import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { generateAndStoreDailyColumn, dailySlug } from '@/lib/daily-analysis';
import { getTodaysNumber } from '@/lib/numerology';
import { notifyPublished } from '@/lib/instant-index';

export const maxDuration = 300;
export const runtime = 'nodejs';

// Daily: generate the numerology news-analysis column and store it as an Article.
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug, created, column } = await generateAndStoreDailyColumn();

    revalidatePath('/');
    revalidatePath('/numerology/daily');
    revalidatePath(`/article/${slug}`);
    if (created) {
      await notifyPublished([slug]).catch(() => {});
    }

    return NextResponse.json({
      ok: true,
      slug,
      created,
      number: column.number,
      wordCount: column.wordCount,
      matched: column.matchedCount,
      scanned: column.scannedCount,
      generatedBy: column.generatedBy,
    });
  } catch (err) {
    console.error('[cron/analysis] failed:', err);
    return NextResponse.json(
      { ok: false, error: String(err), slug: dailySlug(getTodaysNumber().dateKey) },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { processScrapeItemToArticle } from '@/lib/scraper';
import { revalidatePath } from 'next/cache';
import { CATEGORIES } from '@/lib/types';
import type { ImageCandidate } from '@/lib/imageSearch';

export const maxDuration = 300;
export const runtime = 'nodejs';

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get('Catzye_admin')?.value;
  const expected = process.env.ADMIN_PASSWORD ?? process.env.CRON_SECRET ?? '';
  if (!expected) return true;
  return cookie === Buffer.from(expected).toString('base64');
}

function revalidateSite() {
  revalidatePath('/');
  revalidatePath('/bs', 'layout');
  for (const { slug } of CATEGORIES) {
    revalidatePath(`/${slug}`);
    revalidatePath(`/bs/${slug}`);
  }
}

export interface ProcessResponse {
  succeeded: number;
  results: { articleId: string; title: string; images: ImageCandidate[]; keywords: string[] }[];
  failed: { title: string; error: string }[];
}

export async function POST(request: NextRequest): Promise<NextResponse<ProcessResponse>> {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ succeeded: 0, results: [], failed: [{ title: 'Auth', error: 'Unauthorized' }] }, { status: 401 });
  }

  const body = await request.json();
  const ids: string[] = body.ids ?? [];

  if (!ids.length) {
    return NextResponse.json({ succeeded: 0, results: [], failed: [{ title: '', error: 'No IDs provided' }] }, { status: 400 });
  }

  const items = await prisma.scrapedItem.findMany({
    where: { id: { in: ids }, status: 'pending' },
  });

  let succeeded = 0;
  const results: { articleId: string; title: string; images: ImageCandidate[]; keywords: string[] }[] = [];
  const failed: { title: string; error: string }[] = [];

  for (const item of items) {
    const result = await processScrapeItemToArticle({
      title: item.title,
      description: item.description,
      sourceUrl: item.sourceUrl,
      source: item.source,
      category: item.category,
      pubDate: item.pubDate ? new Date(item.pubDate) : null,
    });

    if (result.success) {
      await prisma.scrapedItem.update({ where: { id: item.id }, data: { status: 'done' } });
      results.push({ articleId: result.articleId, title: item.title, images: result.images, keywords: result.keywords });
      succeeded++;
    } else {
      failed.push({ title: item.title, error: result.error });
    }
  }

  revalidatePath('/admin');
  revalidateSite();

  return NextResponse.json({ succeeded, results, failed });
}

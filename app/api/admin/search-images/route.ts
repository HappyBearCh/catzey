import { NextRequest, NextResponse } from 'next/server';
import { findImages } from '@/lib/imageSearch';
import type { ImageCandidate } from '@/lib/imageSearch';

export const maxDuration = 60;
export const runtime = 'nodejs';

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get('Catzye_admin')?.value;
  const expected = process.env.ADMIN_PASSWORD ?? process.env.CRON_SECRET ?? '';
  if (!expected) return true;
  return cookie === Buffer.from(expected).toString('base64');
}

export async function POST(request: NextRequest): Promise<NextResponse<{ images: ImageCandidate[] }>> {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ images: [] }, { status: 401 });
  }

  const body = await request.json();
  const keywords: string[] = (body.keywords ?? []).map((k: string) => k.trim()).filter(Boolean);

  if (!keywords.length) {
    return NextResponse.json({ images: [] }, { status: 400 });
  }

  const images = await findImages(keywords);
  return NextResponse.json({ images });
}

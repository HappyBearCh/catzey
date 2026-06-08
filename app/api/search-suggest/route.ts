import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim() ?? '';
  if (q.length < 2) return NextResponse.json({ results: [] });

  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true,
        title: { contains: q, mode: 'insensitive' },
      },
      select: { slug: true, title: true, category: true },
      orderBy: { views: 'desc' },
      take: 6,
    });
    return NextResponse.json({ results: articles });
  } catch {
    return NextResponse.json({ results: [] });
  }
}

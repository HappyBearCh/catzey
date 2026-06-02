import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CATEGORIES } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 50);
  const page = Math.max(parseInt(searchParams.get('page') ?? '1'), 1);

  const validCategory =
    category && CATEGORIES.find((c) => c.slug === category) ? category : undefined;

  try {
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where: validCategory ? { category: validCategory, published: true } : { published: true },
        orderBy: { publishedAt: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
        select: {
          id: true,
          title: true,
          excerpt: true,
          slug: true,
          imageUrl: true,
          category: true,
          source: true,
          publishedAt: true,
        },
      }),
      prisma.article.count({
        where: validCategory ? { category: validCategory, published: true } : { published: true },
      }),
    ]);

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('Articles API error:', err);
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }
}

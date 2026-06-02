import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    await prisma.article.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });
  } catch {
    // non-critical — silently ignore missing article or DB errors
  }
  return new Response(null, { status: 204 });
}

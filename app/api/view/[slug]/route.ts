import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    // Raw UPDATE so the view counter does NOT trip Prisma's @updatedAt. Bumping
    // updatedAt on every page view made schema.org dateModified churn constantly,
    // which dilutes the article's freshness/trust signal in search. updatedAt now
    // changes only on genuine editorial edits.
    await prisma.$executeRaw`UPDATE "Article" SET views = views + 1 WHERE slug = ${slug}`;
  } catch {
    // non-critical — silently ignore missing article or DB errors
  }
  return new Response(null, { status: 204 });
}

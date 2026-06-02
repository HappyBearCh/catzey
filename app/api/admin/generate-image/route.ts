import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateArticleImage } from '@/lib/imageGenerate';

export const maxDuration = 120;
export const runtime = 'nodejs';

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get('Catzye_admin')?.value;
  const expected = process.env.ADMIN_PASSWORD ?? process.env.CRON_SECRET ?? '';
  if (!expected) return true;
  return cookie === Buffer.from(expected).toString('base64');
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse> {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { articleId } = await request.json();
  if (!articleId) {
    return NextResponse.json({ error: 'articleId required' }, { status: 400 });
  }

  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: { title: true, excerpt: true, category: true },
  });

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  let image: Awaited<ReturnType<typeof generateArticleImage>>;
  try {
    image = await generateArticleImage(article.title, article.excerpt, article.category);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[generate-image] Failed:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const cost = image.credit.includes('Imagen 4') ? '$0.02' : '~$0.01';
  return NextResponse.json({ image, cost, model: image.credit });
}

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { generateEssay } from '@/lib/essay';

export const runtime = 'nodejs';
export const maxDuration = 120;

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const auth = request.headers.get('authorization');
  const secret = process.env.CRON_SECRET;
  if (secret && auth === `Bearer ${secret}`) return true;
  const cookieStore = await cookies();
  const cookie = cookieStore.get('Catzye_admin')?.value;
  const password = process.env.ADMIN_PASSWORD ?? secret ?? '';
  return !!password && cookie === Buffer.from(password).toString('base64');
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { seriesId, topicIndex } = await request.json() as { seriesId: string; topicIndex: number };

  const series = await prisma.series.findUnique({ where: { id: seriesId } });
  if (!series) return NextResponse.json({ error: 'Series not found' }, { status: 404 });

  const topics = series.topics as string[];
  const topic = topics[topicIndex];
  if (!topic) return NextResponse.json({ error: 'Topic not found' }, { status: 404 });

  const partNumber = topicIndex + 1;
  const totalParts = topics.length;

  // Check if already generated
  const existing = await prisma.article.findFirst({
    where: { seriesId, seriesOrder: partNumber },
  });
  if (existing) {
    return NextResponse.json({ articleId: existing.id, slug: existing.slug, alreadyExists: true });
  }

  const essay = await generateEssay(
    series.title,
    series.description ?? '',
    topic,
    partNumber,
    totalParts,
  );

  // Build a unique slug and sourceUrl
  const baseSlug = slugify(essay.title);
  let slug = baseSlug;
  let suffix = 0;
  while (await prisma.article.findUnique({ where: { slug } })) {
    suffix++;
    slug = `${baseSlug}-${suffix}`;
  }

  const sourceUrl = `https://catzye.com/series/${series.slug}/part-${partNumber}`;

  const article = await prisma.article.create({
    data: {
      title: essay.title,
      excerpt: essay.excerpt,
      content: essay.content,
      slug,
      category: series.category,
      source: 'Catzye Editorial',
      sourceUrl,
      publishedAt: new Date(),
      published: false,
      tags: essay.tags,
      entities: essay.entities,
      pullQuote: essay.pullQuote || null,
      seriesId,
      seriesOrder: partNumber,
    },
  });

  return NextResponse.json({ articleId: article.id, slug: article.slug });
}

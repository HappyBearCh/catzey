import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('Catzye_admin')?.value;
  const password = process.env.ADMIN_PASSWORD ?? process.env.CRON_SECRET ?? '';
  if (!password) return true;
  return cookie === Buffer.from(password).toString('base64');
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, slug, description, category } = await request.json() as {
    title: string; slug: string; description?: string; category: string;
  };

  if (!title || !slug) return NextResponse.json({ error: 'title and slug are required' }, { status: 400 });

  try {
    const series = await prisma.series.create({
      data: { title, slug, description: description || null, category, topics: [] },
    });
    return NextResponse.json({ id: series.id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('Unique constraint')) return NextResponse.json({ error: 'Slug already taken' }, { status: 409 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

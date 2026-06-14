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

interface Params { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await request.json() as {
    title?: string; description?: string; imageUrl?: string; topics?: string[];
    synopsis?: string; status?: string; genres?: string[]; externalUrl?: string;
  };
  const series = await prisma.series.update({
    where: { id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
      ...(body.topics !== undefined && { topics: body.topics }),
      ...(body.synopsis !== undefined && { synopsis: body.synopsis || null }),
      ...(body.status !== undefined && { status: body.status || null }),
      ...(body.genres !== undefined && { genres: body.genres }),
      ...(body.externalUrl !== undefined && { externalUrl: body.externalUrl || null }),
    },
  });
  return NextResponse.json({ id: series.id });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  // Unlink articles before deleting
  await prisma.article.updateMany({ where: { seriesId: id }, data: { seriesId: null, seriesOrder: null } });
  await prisma.series.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

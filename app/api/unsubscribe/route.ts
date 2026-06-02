import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token) {
    return new NextResponse('Invalid link', { status: 400 });
  }
  try {
    await prisma.subscriber.delete({ where: { token } });
  } catch {
    // Already deleted or not found — treat as success
  }
  return new NextResponse(
    `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:60px;">
      <h2>You've been unsubscribed.</h2>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com'}">← Back to Catzye</a></p>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html' } },
  );
}

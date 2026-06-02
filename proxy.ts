import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const cookie = request.cookies.get('Catzye_admin')?.value;
    const password = process.env.ADMIN_PASSWORD ?? process.env.CRON_SECRET ?? '';
    const expected = Buffer.from(password).toString('base64');

    if (!cookie || cookie !== expected) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

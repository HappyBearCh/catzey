import { NextRequest, NextResponse } from 'next/server';
import { CATEGORIES } from '@/lib/types';

const CATEGORY_SLUGS = new Set<string>(CATEGORIES.map((c) => c.slug));

// Category archives used to carry `?sort=` and `?page=` query strings. Reading
// searchParams in a page opts the whole route out of static rendering, so those
// two params quietly turned every category hit into a function invocation and a
// pair of database queries. Sorting and pagination now live in the path; the old
// URLs are redirected here, in front of the cache, so no page function runs.
function legacyArchiveTarget(pathname: string, params: URLSearchParams): string | null {
  const segments = pathname.split('/').filter(Boolean);
  if (!CATEGORY_SLUGS.has(segments[0])) return null;

  // Only `/{category}` and `/{category}/page/{n}` ever carried these params.
  let page = 1;
  if (segments.length === 3 && segments[1] === 'page') {
    if (!/^\d+$/.test(segments[2])) return null;
    page = parseInt(segments[2], 10);
  } else if (segments.length !== 1) {
    return null;
  }

  const legacyPage = parseInt(params.get('page') ?? '', 10);
  if (Number.isFinite(legacyPage) && legacyPage > 1) page = legacyPage;

  const base = params.get('sort') === 'popular' ? `/${segments[0]}/popular` : `/${segments[0]}`;
  return page > 1 ? `${base}/page/${page}` : base;
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const cookie = request.cookies.get('Catzye_admin')?.value;
    const password = process.env.ADMIN_PASSWORD ?? process.env.CRON_SECRET ?? '';
    const expected = Buffer.from(password).toString('base64');

    if (!cookie || cookie !== expected) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  const target = legacyArchiveTarget(pathname, searchParams);
  if (target && target !== pathname) {
    return NextResponse.redirect(new URL(target, request.url), 308);
  }
  // Same destination, but the query string has to go or the cache is bypassed.
  if (target) {
    return NextResponse.redirect(new URL(pathname, request.url), 308);
  }

  return NextResponse.next();
}

// Scoped tightly: /admin, plus archive URLs that still carry a legacy `sort` or
// `page` query. Everything else skips the proxy entirely, so ordinary traffic is
// served straight from the CDN without a middleware invocation.
export const config = {
  matcher: [
    '/admin/:path*',
    { source: '/:category', has: [{ type: 'query', key: 'sort' }] },
    { source: '/:category', has: [{ type: 'query', key: 'page' }] },
    { source: '/:category/page/:page', has: [{ type: 'query', key: 'sort' }] },
    { source: '/:category/page/:page', has: [{ type: 'query', key: 'page' }] },
  ],
};

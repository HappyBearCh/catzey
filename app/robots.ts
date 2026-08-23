import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    // One sitemap. The Google News sitemap that used to sit beside it covered a
    // rolling two-day window, and the archive stopped taking new reporting long
    // before that — so it served an empty urlset on every fetch. Catzye is a
    // reference now, not a wire.
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}

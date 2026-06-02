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
    sitemap: [
      `${BASE}/sitemap.xml`,
      `${BASE}/news-sitemap.xml`,
      `${BASE}/sitemap-hreflang.xml`,
    ],
    host: BASE,
  };
}

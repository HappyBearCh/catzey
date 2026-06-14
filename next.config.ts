import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    // Scraped article images are hotlinked from arbitrary news domains when the
    // blob mirror fails, so the hostname must stay open — but https only.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default config;

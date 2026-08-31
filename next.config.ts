import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // A transformed image is billed once per transformation and again for every
    // regional cache write, and the sources never change — the edition is
    // frozen in data/*.json and article images are immutable per deploy. A
    // one-day TTL therefore bought nothing but a fresh round of both every
    // morning; a year matches how often the underlying files actually move.
    minimumCacheTTL: 31536000,
    // Every width in these lists is a separately billed transformation of every
    // image. Nothing in the layout asks for more than a full-width hero (the
    // widest `sizes` is 100vw) so the 2048 and 3840 retina steps were paying
    // for pixels no viewport requests, and the small imageSizes below 64 are
    // unused — the narrowest fixed slot is the 80px thumbnail.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    qualities: [75],
    // Scraped article images are hotlinked from arbitrary news domains when the
    // blob mirror fails, so the hostname must stay open — but https only.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default config;

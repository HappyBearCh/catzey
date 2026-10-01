import type { NextConfig } from 'next';
import { GUIDE_ONLY_CATEGORIES } from './lib/types';

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
    // The guides' hero images are the only remote images left, and they come
    // from two hosts.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
  async redirects() {
    // Seven sections never carried a text; their archives rendered empty and
    // noindexed themselves. Each keeps a hand-written guide, so the archive
    // URL hands the reader to it rather than to an empty page.
    const guideOnly = GUIDE_ONLY_CATEGORIES.flatMap(({ slug }) => [
      { source: `/${slug}`, destination: `/${slug}/guide`, permanent: true },
      { source: `/${slug}/page/:page`, destination: `/${slug}/guide`, permanent: true },
      { source: `/${slug}/feed.xml`, destination: '/feed.xml', permanent: true },
    ]);
    return [
      ...guideOnly,
      // The daily column desk ran five days in July 2026. Its columns were
      // machine-written and are out of the index; the archive page listing only
      // them folds into the numerology reference.
      { source: '/numerology/daily', destination: '/numerology', permanent: true },
      // Rankings retired: they sorted by a view counter that stopped moving when
      // reads left Postgres, so they were ordering the edition by noise. Their
      // URLs are permanent redirects rather than 404s because they were linked
      // and crawled for months.
      { source: '/trending', destination: '/', permanent: true },
      { source: '/:category/popular', destination: '/:category', permanent: true },
      { source: '/:category/popular/page/:page', destination: '/:category/page/:page', permanent: true },
    ];
  },
};

export default config;

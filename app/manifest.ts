import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Catzye — Manga & Anime News',
    short_name: 'Catzye',
    description: 'Latest manga and anime news, reviews, and industry updates.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0b1e',
    theme_color: '#7c3aed',
    orientation: 'portrait',
    categories: ['news', 'entertainment'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Manga', url: '/manga', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: 'Anime', url: '/anime', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
    ],
  };
}

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Catzye — Manga, Filed by Number',
    short_name: 'Catzye',
    description:
      'A reference to how manga works, arranged by the number each title reduces to: explainers, a glossary, series and creator entries, and an index of the numbered sets manga invented for itself.',
    start_url: '/',
    display: 'standalone',
    // The old purple belonged to the news site. These are the reference's own
    // ground and gold, matching the theme colours in app/layout.tsx.
    background_color: '#0d0c14',
    theme_color: '#c9a227',
    orientation: 'portrait',
    categories: ['education', 'books', 'reference'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'The Shelves', url: '/numbers', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: 'Numbered Sets', url: '/sets', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: 'Glossary', url: '/glossary', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
    ],
  };
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com'),
  title: {
    default: 'Catzye — Manga & Anime News',
    template: '%s | Catzye',
  },
  description:
    'Latest manga and anime news, reviews, and industry updates from around the world.',
  keywords: ['manga', 'anime', 'manhwa', 'light novels', 'reviews', 'industry news'],
  openGraph: {
    siteName: 'Catzye',
    locale: 'en_US',
    type: 'website',
  },
};

const themeScript = `
(function() {
  try {
    var s = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (s === 'dark' || (!s && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-white transition-colors">
        {children}
      </body>
    </html>
  );
}

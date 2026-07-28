import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const DEFAULT_OG = '/og?title=Catzye%20%E2%80%94%20Manga%20%26%20Anime%20News';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7c3aed' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0b1e' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com'),
  title: {
    default: 'Catzye — Manga & Anime News',
    template: '%s | Catzye',
  },
  description:
    'Latest manga and anime news, reviews, and industry updates from around the world.',
  keywords: ['manga', 'anime', 'manhwa', 'light novels', 'reviews', 'industry news'],
  // Google truncates image previews to a thumbnail and snippets to ~160 chars
  // unless told otherwise. `max-image-preview:large` is a hard requirement for
  // Google Discover eligibility and for large thumbnails in Top Stories — the
  // two surfaces that drive most traffic to a news site. Set sitewide; the few
  // pages that opt out (search, /saved, admin, thin tag/topic hubs) override
  // this with their own `robots` block.
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    siteName: 'Catzye',
    locale: 'en_US',
    type: 'website',
    images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: 'Catzye — Manga & Anime News' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [DEFAULT_OG],
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
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://public.blob.vercel-storage.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://public.blob.vercel-storage.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-white transition-colors">
        {children}
        <SpeedInsights />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LMY924VEPX"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-LMY924VEPX');`}
        </Script>
      </body>
    </html>
  );
}

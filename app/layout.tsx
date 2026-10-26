import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Source_Serif_4, Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

// A text serif for reading and a grotesque for labels and interface chrome.
// The serif carries the body copy; the sans is reserved for small caps, nav
// and metadata, which is what keeps the page reading as a reference work
// rather than a feed.
const serif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  // Variable: one file per style carries every weight, where three static
  // weights cost three downloads each.
  style: ['normal', 'italic'],
});

// The grotesque carries the interface and, at its heaviest cuts, every heading
// (globals.css points --font-display at it). Headings used to be set in a
// Japanese Gothic, but Google ships that face as some 120 unicode-range slices
// per weight: 484 @font-face rules, a 364 KB stylesheet that blocked every
// page from rendering, for headings that are nearly all Latin. The rare kana
// and kanji now fall through to the system's Japanese Gothic (Hiragino, Yu
// Gothic, Noto Sans CJK), which every phone and desktop has.
// Variable, so no weight list: one file covers 100–900.
const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const DEFAULT_OG = '/og?title=Catzye%20%E2%80%94%20Learn%20Manga';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f4ee' },
    { media: '(prefers-color-scheme: dark)', color: '#14110f' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com'),
  title: {
    default: 'Catzye — Manga, Filed by Number',
    template: '%s | Catzye',
  },
  description:
    'How manga works — explainers, a full glossary, and reference entries for series and creators — arranged not by topic but by the number each title reduces to, across twelve shelves.',
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
    images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: 'Catzye — Learn Manga' }],
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
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink dark:bg-ground dark:text-parchment transition-colors">
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

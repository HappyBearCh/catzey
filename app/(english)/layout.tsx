import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { organizationLd, websiteLd } from '@/lib/seo';

export const metadata: Metadata = {
  alternates: {
    types: { 'application/rss+xml': '/feed.xml' },
  },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* The publisher and site nodes belong on every page, not just the front
          one. They used to sit inside the homepage's has-articles branch, so
          they vanished entirely on the empty-archive path and were absent from
          the ~2,300 other URLs that reference them from their own markup. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-bold focus:shadow-lg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </>
  );
}

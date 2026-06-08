import type { Metadata } from 'next';
import { BosnianHeader } from '@/components/BosnianHeader';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';

export const metadata: Metadata = {
  title: {
    default: 'Catzye — Vijesti iz Bosne',
    template: '%s | Catzye',
  },
  description: 'Vijesti iz Bosne na bosanskom jeziku.',
  keywords: ['Bosna', 'vijesti', 'Sarajevo', 'Balkan'],
  openGraph: {
    siteName: 'Catzye',
    locale: 'bs_BA',
    type: 'website',
  },
  alternates: {
    types: { 'application/rss+xml': '/bs/feed.xml' },
  },
};

export default function BosnianLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BosnianHeader />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer basePath="/bs" />
      <BottomNav basePath="/bs" />
    </>
  );
}

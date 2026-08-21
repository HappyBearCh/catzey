import type { Metadata } from 'next';
import Link from 'next/link';
import { ShelfBand } from '@/components/ShelfBand';
import Image from 'next/image';
import { getAllGuides } from '@/lib/guides';
import { getAllStandaloneGuides } from '@/lib/standalone-guides';
import { CATEGORIES } from '@/lib/types';

export const revalidate = false;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Guides — Manga & Anime',
  description: 'In-depth guides to manga and anime: history, genres, how to start reading, best series, and more.',
  alternates: { canonical: `${BASE}/guides` },
  openGraph: {
    title: 'Manga & Anime Guides | Catzye',
    description: 'In-depth guides to manga and anime history, genres, and the best series to read.',
    url: `${BASE}/guides`,
    images: [{ url: `/og?title=Manga%20%26%20Anime%20Guides`, width: 1200, height: 630 }],
  },
};

export default function GuidesPage() {
  const categoryGuides = getAllGuides();
  const standaloneGuides = getAllStandaloneGuides();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-xs text-site-gray mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Guides</span>
      </nav>

      <div className="flex items-center gap-3 mb-2">
        <span className="block w-1 h-8 bg-primary" />
        <h1 className="text-3xl font-semibold uppercase tracking-tight">Guides</h1>
      </div>
      <p className="text-site-gray text-sm mb-10 ml-4">
        In-depth guides to manga, anime, and Japanese pop culture
      </p>

      <ShelfBand titles={standaloneGuides.map((g) => g.title)} noun="guides" className="mb-10" />

      {/* Standalone guides */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-5 flex items-center gap-3">
          <span className="block w-1 h-5 bg-primary" />
          Essential Reading
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {standaloneGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group border border-site-border hover:border-primary transition-colors rounded-sm overflow-hidden"
            >
              <div className="relative w-full h-40 overflow-hidden">
                <Image
                  src={guide.heroImage.src}
                  alt={guide.heroImage.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <p className="text-2xs font-semibold uppercase tracking-widest text-primary mb-1">{guide.readingTime} min read</p>
                <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">{guide.title}</h3>
                <p className="text-xs text-site-gray mt-1 line-clamp-2">{guide.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category guides */}
      <section>
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-5 flex items-center gap-3">
          <span className="block w-1 h-5 bg-primary" />
          Category Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categoryGuides.map((guide) => {
            const category = CATEGORIES.find((c) => c.slug === guide.slug);
            return (
              <Link
                key={guide.slug}
                href={`/${guide.slug}/guide`}
                className="group border border-site-border hover:border-primary transition-colors rounded-sm overflow-hidden"
              >
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={guide.heroImage.src}
                    alt={guide.heroImage.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <p className="text-2xs font-semibold uppercase tracking-widest text-primary mb-1">{category?.label}</p>
                  <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">{guide.title}</h3>
                  <p className="text-xs text-site-gray mt-1 line-clamp-2">{guide.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

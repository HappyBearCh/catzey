import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getGuide, getAllGuides } from '@/lib/guides';
import { CATEGORIES } from '@/lib/types';

export const revalidate = false; // static — guide content never changes at runtime

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const guide = getGuide(category);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.subtitle,
    openGraph: {
      title: guide.title,
      description: guide.subtitle,
      images: [{ url: guide.heroImage.src }],
    },
  };
}

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ category: g.slug }));
}

export default async function GuidePage({ params }: Props) {
  const { category } = await params;

  const validCategory = CATEGORIES.find((c) => c.slug === category);
  if (!validCategory) notFound();

  const guide = getGuide(category);
  if (!guide) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-site-gray mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${category}`} className="hover:text-primary transition-colors capitalize">
          {validCategory.label}
        </Link>
        <span>/</span>
        <span className="text-white">Guide</span>
      </nav>

      {/* Hero image */}
      <div className="relative w-full h-72 md:h-96 mb-8 rounded-sm overflow-hidden">
        <Image
          src={guide.heroImage.src}
          alt={guide.heroImage.alt}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Image credit */}
        <p className="absolute bottom-3 right-3 text-2xs text-white/60">
          Photo by{' '}
          <a
            href={guide.heroImage.creditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/90"
          >
            {guide.heroImage.credit}
          </a>
          {' '}· {guide.heroImage.license}
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-black uppercase tracking-widest text-primary border border-primary px-2 py-0.5">
            {validCategory.label}
          </span>
          <span className="text-xs text-site-gray">{guide.readingTime} min read</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-3">{guide.title}</h1>
        <p className="text-site-gray text-lg leading-relaxed">{guide.subtitle}</p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <span className="flex-1 h-px bg-site-border" />
        <span className="w-2 h-2 bg-primary rotate-45 flex-shrink-0" />
        <span className="flex-1 h-px bg-site-border" />
      </div>

      {/* Article body */}
      <article
        className="prose prose-invert prose-sm md:prose-base max-w-none
          prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-3
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-5
          prose-a:text-primary-accent prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white
          prose-ul:text-gray-300 prose-li:mb-1"
        dangerouslySetInnerHTML={{ __html: guide.body }}
      />

      {/* Footer nav */}
      <div className="mt-12 pt-8 border-t border-site-border flex items-center justify-between">
        <Link
          href={`/${category}`}
          className="text-xs font-bold text-site-gray hover:text-primary transition-colors flex items-center gap-1"
        >
          ← Back to {validCategory.label} news
        </Link>
        <Link
          href="/"
          className="text-xs font-bold text-site-gray hover:text-primary transition-colors"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

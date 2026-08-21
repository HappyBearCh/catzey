import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShelfBadge } from '@/components/ShelfBadge';
import { ShelfNeighbours } from '@/components/ShelfNeighbours';
import Image from 'next/image';
import { getGuide, getAllGuides } from '@/lib/guides';
import { CATEGORIES } from '@/lib/types';

function buildFaqSchema(html: string): object | null {
  const parts = html.split(/<h2[^>]*>/i);
  const entities: Array<{ question: string; answer: string }> = [];
  for (let i = 1; i < parts.length; i++) {
    const closeIdx = parts[i].indexOf('</h2>');
    if (closeIdx === -1) continue;
    const question = parts[i].slice(0, closeIdx).replace(/<[^>]+>/g, '').trim();
    const answerHtml = parts[i].slice(closeIdx + 5).split(/<h2/i)[0];
    const answer = answerHtml
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 600);
    if (question && answer.length > 40) entities.push({ question, answer });
  }
  if (entities.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entities.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export const revalidate = false; // static — guide content never changes at runtime

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const guide = getGuide(category);
  if (!guide) return {};
  const url = `${BASE}/${category}/guide`;
  return {
    title: guide.title,
    description: guide.subtitle,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.subtitle,
      url,
      type: 'article',
      images: [{ url: guide.heroImage.src, width: 1200, height: 630, alt: guide.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.subtitle,
      images: [guide.heroImage.src],
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

  const faqSchema = buildFaqSchema(guide.body);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: validCategory.label, item: `${BASE}/${category}` },
      { '@type': 'ListItem', position: 3, name: 'Guide', item: `${BASE}/${category}/guide` },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-xs text-site-gray mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${category}`} className="hover:text-primary transition-colors capitalize">
          {validCategory.label}
        </Link>
        <span>/</span>
        <span className="text-gray-900">Guide</span>
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
          <span className="text-xs font-semibold uppercase tracking-widest text-primary border border-primary px-2 py-0.5">
            {validCategory.label}
          </span>
          <span className="text-xs text-site-gray">{guide.readingTime} min read</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-3">{guide.title}</h1>

        <ShelfBadge title={guide.title} showSum className="mb-4" />
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
        className="prose prose-sm md:prose-base max-w-none
          prose-headings:font-semibold prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-gray-900
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-3
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900
          prose-ul:text-gray-700 prose-li:mb-1"
        dangerouslySetInnerHTML={{ __html: guide.body }}
      />

      <ShelfNeighbours
        title={guide.title}
        selfHref={`/${guide.slug}/guide`}
        className="mt-10"
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

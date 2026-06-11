import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getStandaloneGuide, getAllStandaloneGuides } from '@/lib/standalone-guides';

export const revalidate = false;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ slug: string }>;
}

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getStandaloneGuide(slug);
  if (!guide) return {};
  const ogImage = `/og?title=${encodeURIComponent(guide.title)}`;
  return {
    title: guide.title,
    description: guide.subtitle,
    alternates: { canonical: `${BASE}/guides/${slug}` },
    openGraph: {
      title: guide.title,
      description: guide.subtitle,
      url: `${BASE}/guides/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: guide.title, images: [ogImage] },
  };
}

export function generateStaticParams() {
  return getAllStandaloneGuides().map((g) => ({ slug: g.slug }));
}

export default async function StandaloneGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getStandaloneGuide(slug);
  if (!guide) notFound();

  const faqSchema = buildFaqSchema(guide.body);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.subtitle,
    image: [guide.heroImage.src],
    url: `${BASE}/guides/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Catzye',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.png` },
    },
    inLanguage: 'en',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <nav className="text-xs text-site-gray mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-primary transition-colors">Guides</Link>
        <span>/</span>
        <span className="text-gray-900 truncate max-w-xs">{guide.title}</span>
      </nav>

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
        <p className="absolute bottom-3 right-3 text-2xs text-white/60">
          Photo by{' '}
          <a href={guide.heroImage.creditUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/90">
            {guide.heroImage.credit}
          </a>
          {' '}· {guide.heroImage.license}
        </p>
      </div>

      <div className="mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-primary border border-primary px-2 py-0.5 mr-3">
          Guide
        </span>
        <span className="text-xs text-site-gray">{guide.readingTime} min read</span>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mt-3 mb-3">{guide.title}</h1>
        <p className="text-site-gray text-lg leading-relaxed">{guide.subtitle}</p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <span className="flex-1 h-px bg-site-border" />
        <span className="w-2 h-2 bg-primary rotate-45 flex-shrink-0" />
        <span className="flex-1 h-px bg-site-border" />
      </div>

      <article
        className="prose prose-sm md:prose-base max-w-none
          prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-gray-900
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-3
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900
          prose-ul:text-gray-700 prose-li:mb-1"
        dangerouslySetInnerHTML={{ __html: guide.body }}
      />

      <div className="mt-12 pt-8 border-t border-site-border flex items-center justify-between">
        <Link href="/guides" className="text-xs font-bold text-site-gray hover:text-primary transition-colors flex items-center gap-1">
          ← All Guides
        </Link>
        <Link href="/" className="text-xs font-bold text-site-gray hover:text-primary transition-colors">
          Home
        </Link>
      </div>
    </div>
  );
}

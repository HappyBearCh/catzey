import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getLearnTopic,
  getAllLearnTopics,
  getTopicNeighbours,
  getGlossaryTermsBySlugs,
  getTrack,
  parseFaq,
} from '@/lib/education';

export const revalidate = false; // content is baked in at build time — never revalidate

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ topic: string }>;
}

// Prerendered at build, ISR thereafter — see the note on the glossary route.
export async function generateStaticParams() {
  const topics = await getAllLearnTopics();
  return topics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = await getLearnTopic(slug);
  if (!topic) return {};
  const url = `${BASE}/learn/${topic.slug}`;
  const ogImage = `/og?title=${encodeURIComponent(topic.title)}`;
  return {
    title: topic.title,
    description: topic.summary,
    alternates: { canonical: url },
    openGraph: {
      title: topic.title,
      description: topic.summary,
      url,
      type: 'article',
      modifiedTime: topic.updatedAt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: topic.title, description: topic.summary, images: [ogImage] },
  };
}

export default async function LearnTopicPage({ params }: Props) {
  const { topic: slug } = await params;
  const topic = await getLearnTopic(slug);
  if (!topic) notFound();

  const track = getTrack(topic.track);
  const [{ prev, next, position, total }, related] = await Promise.all([
    getTopicNeighbours(topic),
    getGlossaryTermsBySlugs(topic.related),
  ]);
  const faq = parseFaq(topic.faq);

  // LearningResource rather than plain Article: it is the type that actually
  // describes this content, and it carries educationalLevel natively.
  const topicLd = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'LearningResource'],
    headline: topic.title,
    description: topic.summary,
    url: `${BASE}/learn/${topic.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/learn/${topic.slug}` },
    learningResourceType: 'Explainer',
    educationalLevel: topic.level,
    ...(track && { about: { '@type': 'Thing', name: track.label } }),
    dateModified: topic.updatedAt,
    datePublished: topic.createdAt,
    inLanguage: 'en',
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: 'Catzye',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/icons/icon-512.png`, width: 512, height: 512 },
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: `${BASE}/learn` },
      ...(track ? [{ '@type': 'ListItem', position: 3, name: track.label, item: `${BASE}/learn#${track.slug}` }] : []),
      { '@type': 'ListItem', position: track ? 4 : 3, name: topic.title, item: `${BASE}/learn/${topic.slug}` },
    ],
  };

  // Only emitted when the page really is question-and-answer shaped; thin or
  // invented Q&A in FAQPage schema risks a structured-data manual action.
  const faqLd = faq.length >= 3
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      }
    : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(topicLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/learn" className="hover:text-primary transition-colors">Learn</Link>
        {track && (
          <>
            <span aria-hidden="true">›</span>
            <span>{track.label}</span>
          </>
        )}
      </nav>

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block bg-primary text-white text-2xs font-black uppercase tracking-widest px-2 py-0.5">
          {topic.level}
        </span>
        {total > 0 && (
          <span className="text-2xs font-bold uppercase tracking-wider text-gray-400">
            {position} of {total}
            {track ? ` · ${track.label}` : ''}
          </span>
        )}
      </div>

      <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">{topic.title}</h1>

      <p className="text-lg font-semibold leading-snug border-l-4 border-primary pl-4 py-2 bg-primary/5 mb-8">
        {topic.summary}
      </p>

      <div
        className="article-prose text-gray-800 dark:text-gray-200"
        dangerouslySetInnerHTML={{ __html: topic.body }}
      />

      {faq.length > 0 && (
        <section className="mt-10 pt-6 border-t border-site-border">
          <h2 className="text-sm font-black uppercase tracking-wider mb-4">Common questions</h2>
          <dl className="space-y-4">
            {faq.map(({ question, answer }) => (
              <div key={question} className="border border-site-border rounded-sm p-4">
                <dt className="font-bold mb-1">{question}</dt>
                <dd className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10 pt-6 border-t border-site-border">
          <h2 className="text-sm font-black uppercase tracking-wider mb-3">Terms used here</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/glossary/${r.slug}`}
                className="text-xs px-2.5 py-1 bg-site-light dark:bg-gray-800 text-primary border border-primary/30 hover:bg-primary hover:text-white transition-colors rounded-sm"
              >
                {r.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      {(prev || next) && (
        <nav className="mt-10 pt-6 border-t border-site-border grid grid-cols-2 gap-4">
          {prev ? (
            <Link href={`/learn/${prev.slug}`} className="group flex flex-col gap-1 p-3 border border-site-border rounded-sm hover:border-primary/40 transition-all">
              <span className="text-2xs font-bold uppercase tracking-wider text-gray-400">← Previous</span>
              <span className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {prev.title}
              </span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/learn/${next.slug}`} className="group flex flex-col gap-1 p-3 border border-site-border rounded-sm hover:border-primary/40 transition-all text-right">
              <span className="text-2xs font-bold uppercase tracking-wider text-gray-400">Next →</span>
              <span className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {next.title}
              </span>
            </Link>
          ) : <div />}
        </nav>
      )}
    </div>
  );
}

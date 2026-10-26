import type { Metadata } from 'next';
import { linkReferenceMentions } from '@/lib/reference-links';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { OnThisPage } from '@/components/OnThisPage';
import { extractHeadings, injectHeadingIds, splitStandfirst } from '@/lib/headings';
import { ShelfNeighbours } from '@/components/ShelfNeighbours';
import { UpdatedLine } from '@/components/UpdatedLine';
import { notFound } from 'next/navigation';
import {
  getLearnTopic,
  getAllLearnTopics,
  getTopicNeighbours,
  getGlossaryTermsBySlugs,
  getTrack,
  parseFaq,
} from '@/lib/education';
import { fullerDescription, bodyProse, splitReading, documentTitle, ogImageFor, ORGANIZATION_AUTHOR } from '@/lib/seo';

export const revalidate = false; // content is baked in at build time — never revalidate

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ topic: string }>;
}

// Prerendered at build, ISR thereafter — see the note on the glossary route.
// Every valid slug comes from a closed, file-backed set, so anything outside
// generateStaticParams is a genuine 404 and there is nothing to render on
// demand. Saying so lets Next 404 at the routing layer.
export const dynamicParams = false;

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
  const description = fullerDescription(topic.summarySource ?? topic.summary, bodyProse(topic.body));
  return {
    title: documentTitle(topic.title),
    description,
    alternates: { canonical: url },
    openGraph: {
      siteName: 'Catzye',
      locale: 'en_US',
      title: topic.title,
      description,
      url,
      type: 'article',
      modifiedTime: topic.updatedAt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: topic.title, description, images: [ogImage] },
  };
}

export default async function LearnTopicPage({ params }: Props) {
  const { topic: slug } = await params;
  const topic = await getLearnTopic(slug);
  if (!topic) notFound();
  const split = splitReading(topic.body);
  const body = injectHeadingIds(split.body);
  const reading = split.reading;
  const headings = extractHeadings(body);
  const { standfirst, rest } = splitStandfirst(body);

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
    description: topic.summarySource ?? topic.summary,
    url: `${BASE}/learn/${topic.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/learn/${topic.slug}` },
    image: [ogImageFor(topic.title)],
    author: ORGANIZATION_AUTHOR,
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
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Learn', href: '/learn' },
          ...(track ? [{ name: track.label, href: `/learn#${track.slug}` }] : []),
          { name: topic.title, href: `/learn/${topic.slug}` },
        ]}
      />

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block eyebrow text-gold">
          {topic.level}
        </span>
        {total > 0 && (
          <span className="text-2xs font-bold uppercase tracking-wider text-gray-400">
            {position} of {total}
            {track ? ` · ${track.label}` : ''}
          </span>
        )}
      </div>

      <h1 className="font-display text-3xl md:text-[2.6rem] font-bold tracking-tight leading-tight text-ink dark:text-parchment mb-2">{topic.title}</h1>


      <p className="mt-4 bubble text-lg md:text-xl leading-relaxed text-ink dark:text-parchment/90 mb-8">
        {topic.summarySource ?? topic.summary}
      </p>

      {standfirst && <div className="ref-prose" dangerouslySetInnerHTML={{ __html: standfirst }} />}

      <OnThisPage headings={headings} />

      <div
        className="ref-prose"
        dangerouslySetInnerHTML={{ __html: linkReferenceMentions(rest, `/learn/${topic.slug}`) }}
      />

      <UpdatedLine url={`${BASE}/learn/${topic.slug}`} name={topic.title} updatedAt={topic.updatedAt} className="mt-6" />


      {faq.length > 0 && (
        <section className="mt-10 pt-6 border-t border-site-border">
          <h2 className="chapter-title text-lg mb-5"><span>Common questions</span></h2>
          <dl className="space-y-4">
            {faq.map(({ question, answer }) => (
              <div key={question} className="border-2 border-[rgb(var(--ink-line))] rounded-sm p-4">
                <dt className="font-bold mb-1">{question}</dt>
                <dd className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10 pt-6 border-t border-site-border">
          <h2 className="chapter-title text-lg mb-4"><span>Terms used here</span></h2>
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

      {reading && (
        <div className="ref-prose mt-12" dangerouslySetInnerHTML={{ __html: reading }} />
      )}

      <ShelfNeighbours
        title={topic.title}
        selfHref={`/learn/${topic.slug}`}
        className="mt-10"
      />

      {(prev || next) && (
        <nav className="mt-10 pt-6 border-t border-site-border grid grid-cols-2 gap-4">
          {prev ? (
            <Link href={`/learn/${prev.slug}`} className="group flex flex-col gap-1 p-3 border-2 border-[rgb(var(--ink-line))] rounded-sm hover:border-primary/40 transition-all">
              <span className="text-2xs font-bold uppercase tracking-wider text-gray-400">← Previous</span>
              <span className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {prev.title}
              </span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/learn/${next.slug}`} className="group flex flex-col gap-1 p-3 border-2 border-[rgb(var(--ink-line))] rounded-sm hover:border-primary/40 transition-all text-right">
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

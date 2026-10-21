import type { Metadata } from 'next';
import { linkReferenceMentions } from '@/lib/reference-links';
import Link from 'next/link';
import { ShelfBadge } from '@/components/ShelfBadge';
import { UpdatedLine } from '@/components/UpdatedLine';
import { ShelfNeighbours } from '@/components/ShelfNeighbours';
import { notFound } from 'next/navigation';
import { getCreator, getAllCreators, getWorksByCreator, getWorksBySlugs, getLearnTopic, type Creator, type Work } from '@/lib/education';
import { metaDescription, splitReading, documentTitle } from '@/lib/seo';

export const revalidate = false; // content is baked in at build time — never revalidate

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ slug: string }>;
}

// Prerendered at build, ISR thereafter — see the note on the glossary route.
// Every valid slug comes from a closed, file-backed set, so anything outside
// generateStaticParams is a genuine 404 and there is nothing to render on
// demand. Saying so lets Next 404 at the routing layer.
export const dynamicParams = false;

export async function generateStaticParams() {
  const creators = await getAllCreators();
  return creators.map((c) => ({ slug: c.slug }));
}

const ROLE_TITLE: Record<string, string> = {
  mangaka: 'Manga Artist',
  writer: 'Manga Writer',
  illustrator: 'Illustrator',
  studio: 'Manga Studio',
  director: 'Director',
};

function list(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

// A creator is searched for by name together with the works, so the snippet
// names both before the biography — which often opens on neither.
function creatorLead(creator: Creator, works: Work[]): string {
  const role = (ROLE_TITLE[creator.role] ?? creator.role).toLowerCase();
  const aside = [creator.nativeName, creator.bornYear && `born ${creator.bornYear}`].filter(Boolean).join(', ');
  const known = works.length > 0 ? ` known for ${list(works.slice(0, 3).map((w) => w.title))}` : '';
  const article = /^[aeiou]/.test(role) ? 'an' : 'a';
  return `${creator.name}${aside ? ` (${aside})` : ''} is ${article} ${role}${known}.`;
}

/**
 * The questions people search about a creator, answered from the profile's
 * own fields and the works that credit it — nothing is written per creator.
 */
function quickAnswers(creator: Creator, works: Work[]): { question: string; answer: string }[] {
  const qa: { question: string; answer: string }[] = [];
  const n = creator.name;
  if (works.length > 0) {
    const titled = works.map((w) => (w.startYear ? `${w.title} (${w.startYear})` : w.title));
    qa.push({
      question: `What manga did ${n} create?`,
      answer: `The works by ${n} in this reference are ${list(titled)}.`,
    });
    const first = [...works].filter((w) => w.startYear).sort((a, b) => a.startYear! - b.startYear!)[0];
    if (first && works.length > 1) {
      qa.push({
        question: `What is the earliest ${n} work covered here?`,
        answer: `${first.title}, which began in ${first.startYear}.`,
      });
    }
  }
  if (creator.bornYear) {
    qa.push({ question: `When was ${n} born?`, answer: `${n} was born in ${creator.bornYear}.` });
  }
  if (creator.nativeName) {
    qa.push({ question: `How is ${n} written in Japanese?`, answer: `${n} is written ${creator.nativeName}.` });
  }
  return qa;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const creator = await getCreator(slug);
  if (!creator) return {};
  const url = `${BASE}/wiki/creator/${creator.slug}`;
  const role = ROLE_TITLE[creator.role] ?? creator.role;
  const title = `${creator.name}: ${role}, Works & Biography`;
  const notable = await getWorksBySlugs(creator.notableWorks);
  const description = metaDescription(`${creatorLead(creator, notable)} ${creator.bioSource ?? creator.bio}`);
  const ogImage = `/og?title=${encodeURIComponent(creator.name)}`;
  return {
    title: documentTitle(title),
    description,
    alternates: { canonical: url },
    openGraph: {
      siteName: 'Catzye',
      locale: 'en_US',
      title,
      description,
      url,
      type: 'profile',
      images: [{ url: creator.imageUrl ?? ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [creator.imageUrl ?? ogImage] },
  };
}

export default async function CreatorPage({ params }: Props) {
  const { slug } = await params;
  const creator = await getCreator(slug);
  if (!creator) notFound();

  // Credits come from both directions: works that list this creator, plus any
  // notableWorks the profile names explicitly. Merged and de-duplicated so a
  // work appears once regardless of which side recorded the relationship.
  const [credited, notable] = await Promise.all([
    getWorksByCreator(creator.slug),
    getWorksBySlugs(creator.notableWorks),
  ]);
  const seen = new Set<string>();
  const works = [...notable, ...credited].filter((w) => {
    if (seen.has(w.slug)) return false;
    seen.add(w.slug);
    return true;
  });
  const { body, reading } = splitReading(creator.body);
  const guide = getLearnTopic(`where-to-start-with-${creator.slug}`);
  const answers = quickAnswers(creator, works);
  const faqLd = answers.length > 0 && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answers.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE}/wiki/creator/${creator.slug}#person`,
    name: creator.name,
    ...(creator.nativeName && { alternateName: creator.nativeName }),
    url: `${BASE}/wiki/creator/${creator.slug}`,
    jobTitle: ROLE_TITLE[creator.role] ?? creator.role,
    description: creator.bioSource ?? creator.bio,
    ...(creator.imageUrl && { image: creator.imageUrl }),
    ...(creator.bornYear && { birthDate: String(creator.bornYear) }),
    // The works point back here through their own `author` @id; listing them
    // as knowsAbout would claim them as subjects rather than creations.
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Wiki', item: `${BASE}/wiki` },
      { '@type': 'ListItem', position: 3, name: creator.name, item: `${BASE}/wiki/creator/${creator.slug}` },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/wiki" className="hover:text-primary transition-colors">Wiki</Link>
      </nav>

      <span className="inline-block bg-primary text-white text-2xs font-semibold uppercase tracking-widest px-2 py-0.5 mb-3">
        {creator.role}
      </span>

      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-1">{creator.name}</h1>

      <ShelfBadge title={creator.name} showSum className="mt-3 mb-4" />
      {creator.nativeName && (
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-3">{creator.nativeName}</p>
      )}
      {creator.bornYear && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Born {creator.bornYear}</p>
      )}

      <p className="text-lg font-semibold leading-snug border-l-4 border-primary pl-4 py-2 bg-primary/5 mb-8">
        {creator.bioSource ?? creator.bio}
      </p>

      {guide && (
        <Link
          href={`/learn/${guide.slug}`}
          className="group block mb-8 p-4 border border-line rounded-sm hover:border-primary/40 transition-colors"
        >
          <span className="eyebrow block mb-1">Reading guide</span>
          <span className="font-display text-lg font-semibold text-ink dark:text-parchment group-hover:text-primary transition-colors">
            {guide.title} →
          </span>
        </Link>
      )}

      <div
        className="ref-prose"
        dangerouslySetInnerHTML={{ __html: linkReferenceMentions(body, `/wiki/creator/${creator.slug}`) }}
      />

      <UpdatedLine
        url={`${BASE}/wiki/creator/${creator.slug}`}
        name={creator.name}
        updatedAt={creator.updatedAt}
        about={`${BASE}/wiki/creator/${creator.slug}#person`}
        className="mt-6"
      />

      {works.length > 0 && (
        <section className="mt-10 pt-6 border-t border-site-border">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4">Works</h2>
          <ul className="border border-site-border rounded-sm divide-y divide-site-border">
            {works.map((w) => (
              <li key={w.slug}>
                <Link href={`/wiki/series/${w.slug}`} className="flex items-baseline gap-3 p-3 hover:bg-primary/5 transition-colors group">
                  <span className="font-bold text-sm group-hover:text-primary transition-colors">{w.title}</span>
                  {w.startYear && (
                    <span className="text-xs text-gray-400 flex-shrink-0">{w.startYear}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {answers.length > 0 && (
        <section className="mt-12" aria-labelledby="quick-answers">
          <h2 id="quick-answers" className="eyebrow mb-4 pb-2 border-b border-line">
            Quick answers
          </h2>
          <dl className="divide-y divide-rule/25 dark:divide-rule">
            {answers.map(({ question, answer }) => (
              <div key={question} className="py-3">
                <dt className="font-display font-semibold text-ink dark:text-parchment">{question}</dt>
                <dd className="mt-1 text-ink-2 dark:text-parchment/80 leading-relaxed">{answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {reading && <div className="ref-prose mt-12" dangerouslySetInnerHTML={{ __html: reading }} />}

      <ShelfNeighbours
        title={creator.name}
        selfHref={`/wiki/creator/${creator.slug}`}
        className="mt-10"
      />
    </div>
  );
}

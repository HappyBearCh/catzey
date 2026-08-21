import type { Metadata } from 'next';
import Link from 'next/link';
import { ShelfBadge } from '@/components/ShelfBadge';
import { ShelfNeighbours } from '@/components/ShelfNeighbours';
import { notFound } from 'next/navigation';
import { getCreator, getAllCreators, getWorksByCreator, getWorksBySlugs } from '@/lib/education';

export const revalidate = false; // content is baked in at build time — never revalidate

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ slug: string }>;
}

// Prerendered at build, ISR thereafter — see the note on the glossary route.
// Every valid slug comes from a closed, file-backed set, so anything outside
// generateStaticParams is a genuine 404 and there is nothing to render on
// demand. Saying so lets Next 404 at the routing layer — which is also what
// makes the sibling loading.tsx safe: a loading boundary flushes a 200 shell,
// and once that is sent notFound() can no longer set a status. The article, tag
// and topic routes solve the same problem with gating layouts; here the params
// are finite, so the simpler answer applies.
export const dynamicParams = false;

export async function generateStaticParams() {
  const creators = await getAllCreators();
  return creators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const creator = await getCreator(slug);
  if (!creator) return {};
  const url = `${BASE}/wiki/creator/${creator.slug}`;
  const title = `${creator.name} — ${creator.role}`;
  const ogImage = `/og?title=${encodeURIComponent(creator.name)}`;
  return {
    title,
    description: creator.bio,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: creator.bio,
      url,
      type: 'profile',
      images: [{ url: creator.imageUrl ?? ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description: creator.bio, images: [creator.imageUrl ?? ogImage] },
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

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: creator.name,
    ...(creator.nativeName && { alternateName: creator.nativeName }),
    url: `${BASE}/wiki/creator/${creator.slug}`,
    jobTitle: creator.role,
    description: creator.bio,
    ...(creator.imageUrl && { image: creator.imageUrl }),
    ...(creator.bornYear && { birthDate: String(creator.bornYear) }),
    ...(works.length > 0 && {
      knowsAbout: works.map((w) => w.title),
    }),
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
        {creator.bio}
      </p>

      <div
        className="ref-prose"
        dangerouslySetInnerHTML={{ __html: creator.body }}
      />

      <ShelfNeighbours
        title={creator.name}
        selfHref={`/wiki/creator/${creator.slug}`}
        className="mt-10"
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
    </div>
  );
}

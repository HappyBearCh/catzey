import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArticleCard } from '@/components/ArticleCard';
import { getAuthor, getAllAuthors, resolveAuthor } from '@/lib/authors';
import type { Article } from '@/lib/types';

export const revalidate = 3600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  const canonicalUrl = `${BASE}/author/${slug}`;
  const ogImage = `/og?title=${encodeURIComponent(author.name + ' — ' + author.role)}`;
  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${author.name} — ${author.role} | Catzye`,
      description: author.bio,
      url: canonicalUrl,
      type: 'profile',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${author.name} — ${author.role} | Catzye`,
      description: author.bio,
      images: [ogImage],
    },
  };
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  // Attribution is derived from the article slug + category, so we pull a recent
  // window of published articles and keep the ones this author is credited on.
  let candidates: Article[] = [];
  try {
    candidates = (await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 800,
    })) as Article[];
  } catch {
    candidates = [];
  }
  const articles = candidates
    .filter((a) => resolveAuthor(a).slug === slug)
    .slice(0, 30);

  const authorUrl = `${BASE}/author/${slug}`;

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: authorUrl,
    jobTitle: author.role,
    description: author.longBio,
    knowsAbout: author.beats,
    worksFor: { '@type': 'Organization', name: 'Catzye', url: BASE },
  };

  const profileLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateModified: articles[0] ? new Date(articles[0].publishedAt).toISOString() : undefined,
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      url: authorUrl,
      jobTitle: author.role,
    },
    url: authorUrl,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: author.name, item: authorUrl },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <span className="text-primary font-bold">{author.name}</span>
      </nav>

      <header className="flex flex-col sm:flex-row items-start gap-5 pb-8 mb-8 border-b border-site-border">
        <div
          className="flex-shrink-0 w-20 h-20 rounded-full bg-primary text-white text-2xl font-black flex items-center justify-center"
          aria-hidden="true"
        >
          {initials(author.name)}
        </div>
        <div>
          <p className="text-2xs font-black uppercase tracking-widest text-primary mb-1">{author.role}</p>
          <h1 className="text-3xl font-black tracking-tight mb-3">{author.name}</h1>
          <p className="text-site-gray text-sm leading-relaxed max-w-2xl">{author.longBio}</p>
        </div>
      </header>

      <div className="flex items-center gap-2 mb-6">
        <span className="block w-1 h-6 bg-primary" />
        <h2 className="text-sm font-black uppercase tracking-wider">
          Latest by {author.name}
        </h2>
      </div>

      {articles.length === 0 ? (
        <p className="py-16 text-center text-gray-400 text-sm">No recent articles.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} size="medium" />
          ))}
        </div>
      )}
    </div>
  );
}

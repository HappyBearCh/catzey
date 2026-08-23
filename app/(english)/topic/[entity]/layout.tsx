import { notFound } from 'next/navigation';
import { getTopicArticles } from '@/lib/articles';
import { getTopicInfo } from '@/lib/topic-info';
import { entityFromSlug } from '@/lib/entity-canon';

// Existence is checked in the layout rather than the page so notFound()
// still produces a real 404. A layout renders outside its segment loading.tsx
// Suspense boundary; a page renders inside it, and once that boundary flushes
// the 200 shell Next can no longer set a status and the 404 degrades into a
// soft 404 — a 200 carrying not-found content, which Google penalises as a
// crawl-quality fault. The lookups below are request-cached, so the page reuses
// them instead of querying again.
export default async function TopicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ entity: string }>;
}) {
  const { entity } = await params;
  let decoded = entity;
  try { decoded = decodeURIComponent(entity); } catch {}
  // The segment is a slug; legacy raw-name URLs fall through as themselves.
  const name = (await entityFromSlug(decoded)) ?? decoded;
  // A curated hub is real content and stays up even before it has articles.
  if (!getTopicInfo(name) && (await getTopicArticles(name)).length === 0) notFound();
  return <>{children}</>;
}

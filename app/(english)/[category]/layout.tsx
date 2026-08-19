import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/lib/types';

// Existence is checked in the layout rather than the page so notFound()
// still produces a real 404. A layout renders outside its segment loading.tsx
// Suspense boundary; a page renders inside it, and once that boundary flushes
// the 200 shell Next can no longer set a status and the 404 degrades into a
// soft 404 — a 200 carrying not-found content, which Google penalises as a
// crawl-quality fault. The lookups below are request-cached, so the page reuses
// them instead of querying again.
export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!CATEGORIES.some((c) => c.slug === category)) notFound();
  return <>{children}</>;
}

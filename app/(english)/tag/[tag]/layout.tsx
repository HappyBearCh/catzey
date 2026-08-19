import { notFound } from 'next/navigation';
import { tagSlug, safeDecode, resolveTag } from '@/lib/tags';

// Existence is checked here, in the layout, rather than in the page. A layout
// renders outside its own loading.tsx Suspense boundary, so a notFound() thrown
// here happens before the 200 shell is flushed and Next can still send a real
// 404. Thrown from the page it would arrive too late and degrade into a soft
// 404 — a 200 response carrying not-found content, which Google treats as a
// crawl-quality fault. resolveTag is request-cached, so the page reuses this
// query rather than repeating it.
export default async function TagLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  if (!(await resolveTag(tagSlug(safeDecode(tag))))) notFound();
  return <>{children}</>;
}

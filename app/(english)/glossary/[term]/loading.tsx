import { SkeletonBox, SkeletonReading } from '@/components/Skeleton';

// Mirrors the entry's real shape: category badge, term, shelf badge, the
// one-line definition, then the body and its reading. Holding those heights
// stops the page jumping as it settles.
export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SkeletonBox className="h-3 w-40 mb-4" />
      <SkeletonBox className="h-5 w-24 mb-3" />
      <SkeletonBox className="h-9 w-64 mb-3" />
      <SkeletonBox className="h-8 w-44 mb-6" />
      <SkeletonBox className="h-20 w-full mb-8" />
      <div className="space-y-3">
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-4/5" />
      </div>
      <SkeletonReading />
    </div>
  );
}

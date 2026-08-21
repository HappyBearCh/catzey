import { SkeletonBox } from '@/components/Skeleton';

// A shelf opens on its numeral, then the three paragraphs that say what the
// number means, how to read it, and where it overreaches.
export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SkeletonBox className="h-3 w-40 mb-8" />
      <div className="flex flex-col items-center mb-12">
        <SkeletonBox className="w-20 h-20 md:w-24 md:h-24 rounded-full mb-7" />
        <SkeletonBox className="h-3 w-32 mb-5" />
        <SkeletonBox className="h-10 w-64 mb-4" />
        <SkeletonBox className="h-5 w-80" />
      </div>
      <div className="max-w-reading mx-auto space-y-3 mb-12">
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-4/5" />
      </div>
      <SkeletonBox className="h-3 w-44 mx-auto mb-10" />
      <div className="space-y-4">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex gap-4">
            <SkeletonBox className="h-4 w-12 shrink-0" />
            <div className="flex-1">
              <SkeletonBox className="h-5 w-2/3 mb-2" />
              <SkeletonBox className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

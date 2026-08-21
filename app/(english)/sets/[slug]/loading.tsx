import { SkeletonBox } from '@/components/Skeleton';

// A set entry leads with its count in a hanko, then the filing block that
// contrasts that count against what the English name would have given.
export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SkeletonBox className="h-3 w-36 mb-6" />
      <div className="flex items-start gap-5 mb-8">
        <SkeletonBox className="w-16 h-16 rounded-full shrink-0" />
        <div className="flex-1">
          <SkeletonBox className="h-9 w-2/3 mb-2" />
          <SkeletonBox className="h-5 w-40 mb-2" />
          <SkeletonBox className="h-3 w-56" />
        </div>
      </div>
      <SkeletonBox className="h-16 w-full mb-8" />
      <SkeletonBox className="h-28 w-full mb-8" />
      <div className="space-y-3">
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-5/6" />
        <SkeletonBox className="h-4 w-full" />
      </div>
    </div>
  );
}

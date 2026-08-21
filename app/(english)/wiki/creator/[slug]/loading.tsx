import { SkeletonBox, SkeletonReading } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SkeletonBox className="h-3 w-40 mb-4" />
      <SkeletonBox className="h-9 w-72 mb-3" />
      <SkeletonBox className="h-8 w-44 mb-6" />
      {/* The fact table — role, born, notable works. */}
      <SkeletonBox className="h-32 w-full mb-8" />
      <div className="space-y-3">
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-5/6" />
        <SkeletonBox className="h-4 w-full" />
      </div>
      <SkeletonReading />
    </div>
  );
}

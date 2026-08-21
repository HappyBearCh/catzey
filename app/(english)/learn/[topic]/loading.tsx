import { SkeletonBox, SkeletonReading } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SkeletonBox className="h-3 w-52 mb-4" />
      <SkeletonBox className="h-5 w-40 mb-3" />
      <SkeletonBox className="h-10 w-3/4 mb-2" />
      <SkeletonBox className="h-10 w-1/2 mb-4" />
      <SkeletonBox className="h-8 w-44 mb-8" />
      <div className="space-y-3">
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-5/6" />
        <SkeletonBox className="h-4 w-full" />
      </div>
      <SkeletonReading />
    </div>
  );
}

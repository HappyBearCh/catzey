import { SkeletonBox, SkeletonGrid } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <SkeletonBox className="h-3 w-40 mb-4" />
      <SkeletonBox className="h-9 w-64 mb-2" />
      <SkeletonBox className="h-4 w-80 mb-8" />
      <SkeletonGrid count={12} />
    </div>
  );
}

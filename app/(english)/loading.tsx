import { SkeletonBox, SkeletonGrid } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <SkeletonBox className="h-8 w-48 mb-6" />
      <SkeletonGrid count={8} />
    </div>
  );
}

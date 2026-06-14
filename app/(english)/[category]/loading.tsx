import { SkeletonBox, SkeletonGrid } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <SkeletonBox className="h-3 w-32 mb-4" />
      <SkeletonBox className="h-9 w-56 mb-6" />
      <SkeletonBox className="h-[320px] md:h-[420px] mb-8" />
      <SkeletonGrid count={8} />
    </div>
  );
}

import { SkeletonBox } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-8xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SkeletonBox className="h-3 w-40 mb-4" />
          <SkeletonBox className="h-5 w-20 mb-3" />
          <SkeletonBox className="h-10 w-full mb-2" />
          <SkeletonBox className="h-10 w-2/3 mb-4" />
          <SkeletonBox className="h-4 w-64 mb-6" />
          <SkeletonBox className="aspect-video mb-6" />
          <div className="space-y-3">
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-4 w-5/6" />
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-4 w-3/4" />
          </div>
        </div>
        <div className="hidden lg:block">
          <SkeletonBox className="h-5 w-40 mb-4" />
          <div className="space-y-4">
            <SkeletonBox className="h-16 w-full" />
            <SkeletonBox className="h-16 w-full" />
            <SkeletonBox className="h-16 w-full" />
            <SkeletonBox className="h-16 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

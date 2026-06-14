import { SkeletonBox } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <SkeletonBox className="h-9 w-48 mb-4" />
      <SkeletonBox className="h-4 w-full mb-10" />
      <div className="space-y-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="border border-site-border p-6">
            <SkeletonBox className="h-5 w-3/4 mb-3" />
            <SkeletonBox className="h-4 w-full mb-2" />
            <SkeletonBox className="h-4 w-5/6 mb-4" />
            <SkeletonBox className="h-3 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

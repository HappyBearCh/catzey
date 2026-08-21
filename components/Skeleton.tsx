export function SkeletonBox({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-2">
      <SkeletonBox className="aspect-video" />
      {/* The kicker is a category and a figure, so the placeholder is two
          boxes rather than one — the layout does not shift when it resolves. */}
      <div className="flex items-center gap-1.5">
        <SkeletonBox className="h-3 w-16" />
        <SkeletonBox className="h-3 w-3" />
      </div>
      <SkeletonBox className="h-4 w-full" />
      <SkeletonBox className="h-4 w-3/4" />
    </div>
  );
}

/**
 * The placeholder for a numerological reading — a numeral and a row of cells.
 * Reading blocks are tall, and without a stand-in for them a page jumps by a
 * couple of hundred pixels when it settles.
 */
export function SkeletonReading() {
  return (
    <div className="my-8">
      <div className="flex items-center gap-3 mb-4">
        <SkeletonBox className="w-10 h-10 rounded-full" />
        <SkeletonBox className="h-4 w-56" />
      </div>
      <div className="flex gap-px mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <SkeletonBox key={i} className="h-12 w-20" />
        ))}
      </div>
      <SkeletonBox className="h-3 w-full mb-2" />
      <SkeletonBox className="h-3 w-5/6" />
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

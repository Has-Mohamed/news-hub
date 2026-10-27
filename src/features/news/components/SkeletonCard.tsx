const SkeletonCard = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Image skeleton */}
      <div className="aspect-video animate-pulse bg-gray-200 dark:bg-gray-800" />

      {/* Content skeleton */}
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
          <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard

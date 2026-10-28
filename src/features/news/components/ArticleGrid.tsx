import ArticleCard from "./ArticleCard"

import { Loader2, AlertCircle, Search } from "lucide-react"
import SkeletonCard from "./SkeletonCard"
import type { Article } from "../types/Articles"

type ArticleGridProps = {
  articles: Article[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  isFetchingNextPage: boolean
}

const ArticleGrid = ({
  articles,
  isLoading,
  isError,
  error,
  isFetchingNextPage,
}: ArticleGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/30">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Failed to load articles
        </h3>
        <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    )
  }

  // Empty state
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
          <Search size={32} className="text-gray-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          No articles found
        </h3>
        <p className="max-w-md text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter criteria to find what you're
          looking for.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard article={article} />
        ))}
      </div>

      {/* Loading more indicator */}
      {isFetchingNextPage && (
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Loader2 size={16} className="animate-spin" />
          Loading more articles...
        </div>
      )}
    </div>
  )
}

export default ArticleGrid

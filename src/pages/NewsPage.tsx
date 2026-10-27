import NewsFilters from "@/features/news/components/NewsFilters"
import NewsSearch from "@/features/news/components/Search"
import { Newspaper } from "lucide-react"

const NewsPage = () => {
  return (
    <div className="container-custom py-6 lg:py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <Newspaper size={28} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            Your Daily News
          </h1>
        </div>
        <p className="text-sm text-gray-500 sm:text-base dark:text-gray-400">
          Stay informed with articles from NewsAPI, The Guardian, and New York
          Times.
        </p>
      </div>

      {/* Search */}

      <div className="mb-6">
        <NewsSearch />
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <NewsFilters />
      </div>
      {/* grid */}
    </div>
  )
}

export default NewsPage

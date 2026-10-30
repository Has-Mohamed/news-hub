import { fetchAllArticles } from "@/services/api/newsProviders/newsService"
import { useInfiniteQuery } from "@tanstack/react-query"
import usePreferences from "@/features/preferences/store/usePreferences"
import { sortArticlesByPreferredAuthors } from "../lib/utils"
import { useFilterStore } from "../store/useFilterStore"

const useNews = () => {
  const filters = useFilterStore((state) => state.filters)
  const isReady = useFilterStore((state) => state.isReady)
  const preferredAuthors = usePreferences((state) => state.preferredAuthors)

  return useInfiniteQuery({
    queryKey: ["news", filters],
    // Don't fetch until bootstrap is done (prevents a stale empty-filter request
    // before URL params or preferences have been loaded into state).
    enabled: isReady,
    queryFn: ({ pageParam }) => fetchAllArticles({ page: pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (acc, page) => acc + page.articles.length,
        0
      )
      if (totalFetched >= lastPage.totalResults) return undefined
      return allPages.length + 1
    },

    select: (data) => {
      const allArticles = data.pages.flatMap((page) => page.articles)
      const sortedArticles = sortArticlesByPreferredAuthors(
        allArticles,
        preferredAuthors
      )

      return {
        pages: data.pages,
        pageParams: data.pageParams,
        articles: sortedArticles,
      }
    },
  })
}

export default useNews

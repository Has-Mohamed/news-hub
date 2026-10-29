import { fetchAllArticles } from "@/services/api/newsProviders/newsService"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useResolvedFilters } from "./useResolvedFilters"
import usePreferences from "@/features/preferences/store/usePreferences"
import { sortArticlesByPreferredAuthors } from "../lib/utils"

const useNews = () => {
  const { filters } = useResolvedFilters()
  const preferredAuthors = usePreferences((state) => state.preferredAuthors)
  console.log("useNews", filters)

  return useInfiniteQuery({
    queryKey: ["news", filters],

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

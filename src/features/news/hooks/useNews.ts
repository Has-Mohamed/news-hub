import { fetchAllArticles } from "@/services/api/newsProviders/newsService"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useResolvedFilters } from "./useResolvedFilters"

const useNews = () => {
  const { filters, origin } = useResolvedFilters()

  return useInfiniteQuery({
    queryKey: ["news", filters],
    // avoid fetching when origin is preferences cause it's already applied with changing query params
    enabled: origin !== "preferences",

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

      return {
        pages: data.pages,
        pageParams: data.pageParams,
        articles: allArticles,
      }
    },
  })
}

export default useNews

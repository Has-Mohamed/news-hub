import { fetchAllArticles } from "@/services/api/newsProviders/newsService"
import { useInfiniteQuery } from "@tanstack/react-query"
import useFiltersParams from "./useFiltersParams"

const useNews = () => {
  const { filters } = useFiltersParams()

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

      return {
        pages: data.pages,
        pageParams: data.pageParams,
        articles: allArticles,
      }
    },
  })
}

export default useNews

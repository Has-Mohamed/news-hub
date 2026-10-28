import type {
  Article,
  ArticlesFilters,
  NewsSource,
} from "@/features/news/types/Articles"
import { fetchGuardianArticles } from "./guardian"
import { fetchNewsApiArticles } from "./newsApi"
import { fetchNYTimesArticles } from "./nyTimes"
import type { ArticleApiParams } from "@/services/types"

const newsProviders: Record<
  NewsSource,
  (
    params: ArticleApiParams
  ) => Promise<{ articles: Article[]; totalResults: number }>
> = {
  guardian: fetchGuardianArticles,
  nytimes: fetchNYTimesArticles,
  newsapi: fetchNewsApiArticles,
}

type FetchAllArticlesParams = {
  filters: ArticlesFilters
  page?: number
}

export const fetchAllArticles = async ({
  page = 1,
  filters,
}: FetchAllArticlesParams): Promise<{
  articles: Article[]
  totalResults: number
}> => {
  const { source, ...restFilters } = filters
  const params: ArticleApiParams = { filters: restFilters, page }

  // If a specific source is selected, only fetch from that provider; otherwise fetch from all
  const providersToFetch = source
    ? [newsProviders[source]]
    : Object.values(newsProviders)

  const results = await Promise.allSettled(
    providersToFetch.map((fetchArticles) => fetchArticles(params))
  )

  const articles: Article[] = []
  let totalResults = 0

  for (const result of results) {
    if (result.status === "fulfilled") {
      articles.push(...result.value.articles)
      totalResults += result.value.totalResults
    } else {
      console.error(`Failed to fetch from source: ${source}`, result.reason)
    }
  }
  return { articles, totalResults }
}

import type { Article } from "@/features/news/types/Articles"
import type { ArticleApiParams, NewsApiResponseMap } from "@/services/types"
import { adaptNewsApiArticle } from "./newsAdapter/newsApiAdapter"

const BASE_URL = "https://newsapi.org/v2"
const API_KEY = import.meta.env.VITE_NEWSAPI_KEY

export const fetchNewsApiArticles = async ({
  filters,
  page,
  pageSize = 10,
}: ArticleApiParams): Promise<{
  articles: Article[]
  totalResults: number
}> => {
  const { category, from, search, to } = filters

  try {
    // Build the query string based on filters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      language: "en",
      apiKey: API_KEY,
    })

    let endpoint = "/everything"

    if (search) {
      queryParams.append("q", search)
    } else {
      endpoint = "/top-headlines"
    }

    if (category && category.length > 0) {
      // If category is provided, use "top-headlines" because "everything" doesn't support category parameter
      endpoint = "/top-headlines"
      queryParams.append("country", "us")
      // news api doesn't support multiple categories
      queryParams.append("category", category[0])
    }

    if (from) {
      queryParams.append("from", from)
    }
    if (to) {
      queryParams.append("to", to)
    }

    // Construct the full URL
    const url = `${BASE_URL}/${endpoint}?${queryParams.toString()}`

    // Fetch data from the Guardian API
    const response = await fetch(url)

    // Parse the JSON response
    const data: NewsApiResponseMap["newsapi"] = await response.json()

    // Return the articles data
    return {
      articles: data.articles.map(adaptNewsApiArticle),
      totalResults: data.totalResults,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

import type { Article } from "@/features/news/types/Articles"
import type { ArticleApiParams, NewsApiResponseMap } from "@/services/types"
import { adaptGuardianArticle } from "./newsAdapter/guardianAdapter"

const BASE_URL = "https://content.guardianapis.com"
const API_KEY = import.meta.env.VITE_GUARDIAN_KEY

const CATEGORY_TO_SECTION: Record<string, string> = {
  business: "business",
  technology: "technology",
  science: "science",
  health: "lifeandstyle",
  sports: "sport",
  entertainment: "culture",
  politics: "politics",
  general: "world",
}

export const fetchGuardianArticles = async ({
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
      "show-fields": "headline,trailText,body,thumbnail,byline",
      page: page.toString(),
      "page-size": pageSize.toString(),
      "api-key": API_KEY,
    })

    if (search) {
      queryParams.append("q", search)
    }
    if (from) {
      queryParams.append("from-date", from)
    }
    if (to) {
      queryParams.append("to-date", to)
    }

    const section = CATEGORY_TO_SECTION[category ?? ""] || ""
    if (section) {
      queryParams.append("section", section)
    }

    // Construct the full URL
    const url = `${BASE_URL}/search?${queryParams.toString()}`

    // Fetch data from the Guardian API
    const response = await fetch(url)

    // Parse the JSON response
    const data: NewsApiResponseMap["guardian"] = await response.json()

    // Return the articles data
    return {
      articles: data.response.results.map(adaptGuardianArticle),
      totalResults: data.response.total,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

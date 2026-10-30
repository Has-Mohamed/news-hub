import type { Article } from "@/features/news/types/Articles"
import type { ArticleApiParams, NewsApiResponseMap } from "@/services/types"
import { adaptNYTArticle } from "./newsAdapter/nyTimesAdapter"
import { httpClient } from "../httpClient"

const BASE_URL = "https://api.nytimes.com/svc/search/v2"
const API_KEY = import.meta.env.VITE_NYT_KEY

const CATEGORY_TO_DESK: Record<string, string> = {
  business: "Business",
  technology: "Technology",
  science: "Science",
  health: "Health",
  sports: "Sports",
  entertainment: "Arts",
  politics: "Politics",
  general: "National",
}

export const fetchNYTimesArticles = async ({
  filters,
  page,
}: ArticleApiParams): Promise<{
  articles: Article[]
  totalResults: number
}> => {
  const { category, from, search, to } = filters

  try {
    // Build the query string based on filters
    const queryParams = new URLSearchParams({
      page: (page - 1).toString(), // NYT uses 0-based pagination ,
      "api-key": API_KEY,
      sort: "newest",
    })

    if (search) {
      queryParams.append("q", search)
    }
    if (from) {
      // Begin date (e.g. 20120101)
      queryParams.append("begin_date", from.split("T")[0].split("-").join(""))
    }
    if (to) {
      queryParams.append("end_date", to.split("T")[0].split("-").join(""))
    }

    if (category && category.length > 0) {
      const desk = category.map((c) => `"${CATEGORY_TO_DESK[c]}"`).join(",")
      queryParams.append("fq", `desk:(${desk})`)
    }

    // Construct the full URL
    const url = `${BASE_URL}/articlesearch.json?${queryParams.toString()}`

    const data = await httpClient<NewsApiResponseMap["nytimes"]>({
      url,
      errorMsg: "New York  Times Request failed",
    })

    // Return the articles data
    return {
      articles: data.response.docs.map(adaptNYTArticle),
      totalResults: data.response.metadata.hits,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

import type { Article } from "@/features/news/types/Articles"
import type { NYTArticle } from "@/services/types"

export const adaptNYTArticle = (raw: NYTArticle): Article => {
  return {
    id: `nyt-${raw._id}`,
    title: raw.headline.main || "Untitled",
    description: raw.abstract || raw.snippet || "",
    content: raw.lead_paragraph || raw.abstract || "",
    author: raw.byline?.original?.replace(/^By\s+/i, "") || "New York Times",
    source: "nytimes",
    category: raw.news_desk,
    imageUrl: raw?.multimedia?.default?.url,
    articleUrl: raw.web_url,
    publishedAt: raw.pub_date,
  }
}

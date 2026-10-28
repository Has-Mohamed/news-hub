import type { Article } from "@/features/news/types/Articles"
import type { NewsApiArticle } from "@/services/types"

export const adaptNewsApiArticle = (raw: NewsApiArticle): Article => {
  return {
    id: `newsapi-${encodeURIComponent(raw.url)}`,
    title: raw.title || "Untitled",
    description: raw.description || "",
    content: raw.content || raw.description || "",
    author: raw.author || raw.source.name || "Unknown",
    source: "newsapi",
    category: "general",
    imageUrl: raw.urlToImage || null,
    articleUrl: raw.url,
    publishedAt: raw.publishedAt,
  }
}

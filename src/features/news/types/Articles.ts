export type Articles = {
  id: string
  title: string
  description: string
  imageUrl: string
  source: ArticleSource
  author: string
  publishedAt: string
  category: string
  articleUrl: string
}

export type ArticleSource = "guardian" | "newsapi" | "nytimes"

export const SOURCE_LABELS: Record<ArticleSource, string> = {
  guardian: "The Guardian",
  newsapi: "News API",
  nytimes: "The New York Times",
}

export const CATEGORIES = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
] as const

export type Category = (typeof CATEGORIES)[number]

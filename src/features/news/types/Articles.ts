export type Article = {
  id: string
  title: string
  description: string
  imageUrl: string | null
  content: string
  source: NewsSource
  author: string
  publishedAt: string
  category: string
  articleUrl: string
}

export type NewsSource = "guardian" | "newsapi" | "nytimes"

export const SOURCE_LABELS: Record<NewsSource, string> = {
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

export type ArticlesFilters = {
  search?: string
  category?: string
  from?: string
  to?: string
  source?: NewsSource | null
}

export type Category = (typeof CATEGORIES)[number]

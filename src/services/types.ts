import type {
  ArticlesFilters,
  NewsSource,
} from "@/features/news/types/Articles"

export type ArticleApiParams = {
  filters: ArticlesFilters
  page: number
  pageSize?: number
}

// Enforce that NewsApiResponseMap contains every key from NewsSource
type ValidateSourceMap<T extends Record<NewsSource, unknown>> = T

export type NewsApiResponseMap = ValidateSourceMap<{
  guardian: GuardianApiResponse
  newsapi: NewsApiResponse
  nytimes: NYTResponse
}>

// Guardian API response types
export type GuardianApiResult = {
  id: string
  type: string
  sectionId: string
  sectionName: string
  webPublicationDate: string
  webTitle: string
  webUrl: string
  apiUrl: string
  fields?: {
    headline?: string
    trailText?: string
    body?: string
    thumbnail?: string
    byline?: string
  }
}

export type GuardianApiResponse = {
  response: {
    status: string
    userTier: string
    total: number
    startIndex: number
    pageSize: number
    currentPage: number
    pages: number
    orderBy: string
    results: GuardianApiResult[]
  }
}

// NewsAPI response types
export interface NewsApiResponse {
  status: string
  totalResults: number
  articles: NewsApiArticle[]
}

export interface NewsApiArticle {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

// NYT API response types
export interface NYTResponse {
  status: string
  response: {
    docs: NYTArticle[]
    metadata: {
      hits: number
      offset: number
      time: number
    }
  }
}

export interface NYTArticle {
  abstract: string
  web_url: string
  snippet: string
  lead_paragraph: string
  source: string
  multimedia: NYTMultimedia
  headline: {
    main: string
    kicker: string | null
    print_headline: string | null
  }
  pub_date: string
  document_type: string
  news_desk: string
  section_name: string
  byline: {
    original: string | null
    person: Array<{ firstname: string; lastname: string }>
  }
  _id: string
}

export interface NYTMultimedia {
  caption: string
  credit: string
  default: {
    url: string
    height: number
    width: number
  }
  thumbnail: {
    url: string
    height: number
    width: number
  }
}

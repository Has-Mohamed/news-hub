import type { Article } from "@/features/news/types/Articles"
import type { GuardianApiResult } from "@/services/types"

export const adaptGuardianArticle = (raw: GuardianApiResult): Article => {
  return {
    id: `guardian-${raw.id}`,
    title: raw.fields?.headline || raw.webTitle || "Untitled",
    description: raw.fields?.trailText || "",
    content: raw.fields?.trailText || "",
    author: raw.fields?.byline || "The Guardian",
    source: "guardian",
    category: raw.sectionId,
    imageUrl: raw.fields?.thumbnail || null,
    articleUrl: raw.webUrl,
    publishedAt: raw.webPublicationDate,
  }
}

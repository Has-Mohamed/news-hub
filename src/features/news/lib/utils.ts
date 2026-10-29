import type { Article } from "../types/Articles"

export const sortArticlesByPreferredAuthors = (
  articles: Article[],
  preferredAuthors: string[]
): Article[] => {
  if (!preferredAuthors.length) return articles

  const getPriority = (author: string): number => {
    if (!author) return -1
    const lowerAuthor = author.toLowerCase()
    return preferredAuthors.findIndex((pref) => {
      const trimmed = pref.trim().toLowerCase()
      return trimmed ? lowerAuthor.includes(trimmed) : false
    })
  }

  return [...articles].sort((a, b) => {
    const priorityA = getPriority(a.author)
    const priorityB = getPriority(b.author)

    if (priorityA !== -1 && priorityB !== -1) {
      return priorityA - priorityB
    }
    if (priorityA !== -1) return -1
    if (priorityB !== -1) return 1
    return 0
  })
}

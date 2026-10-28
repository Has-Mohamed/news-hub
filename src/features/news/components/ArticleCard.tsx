import { Clock, ExternalLink, User } from "lucide-react"
import type { Article } from "../types/Articles"
import { formatDistanceToNow } from "date-fns"
import { SOURCE_LABELS } from "../types/Articles"
import { Badge } from "@/components/ui/badge"

const ArticleCard = ({ article }: { article: Article }) => {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  })

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 dark:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}
        <Badge variant={article.source} className="absolute top-2 right-2">
          {SOURCE_LABELS[article.source]}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {timeAgo}
          </span>
          {article.category !== "general" && <Badge>{article.category}</Badge>}
        </div>

        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          <a
            href={article.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {article.title}
          </a>
        </h3>

        <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-600 dark:text-gray-400">
          {article.description}
        </p>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
          <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <User size={12} />
            <span className="max-w-37.5 truncate">{article.author}</span>
          </span>
          <a
            href={article.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Read more
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </article>
  )
}

export default ArticleCard

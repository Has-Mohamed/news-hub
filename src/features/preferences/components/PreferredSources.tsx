import { Check, Globe } from "lucide-react"
import { SOURCE_LABELS, type NewsSource } from "@/features/news/types/Articles"
import usePreferences from "../store/usePreferences"
import { cn } from "@/lib/utils"

const PreferredSource = () => {
  const { preferredSource, toggleSource } = usePreferences()

  const allSources = Object.keys(SOURCE_LABELS) as NewsSource[]
  return (
    <section>
      <div className="mb-2 flex items-center gap-2">
        <Globe size={14} className="text-blue-600 dark:text-blue-400" />
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-300">
          Preferred Source
        </h2>
      </div>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Select the news source you want in your feed. If none are selected, all
        sources are included by default.
      </p>

      <div className="grid grid-cols-1 gap-3">
        {allSources.map((source) => {
          const isSelected = preferredSource.includes(source)
          return (
            <button
              key={source}
              type="button"
              onClick={() => toggleSource(source)}
              className={cn(
                "flex items-center justify-between rounded-xl border p-4 text-left transition-all",
                "border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500",
                {
                  "bg-blue-50/50 text-blue-700 shadow-sm dark:border-blue-500 dark:bg-blue-950/20 dark:text-blue-300":
                    isSelected,
                }
              )}
            >
              <span className="text-sm font-medium">
                {SOURCE_LABELS[source]}
              </span>
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                    : "border-gray-300 bg-transparent dark:border-gray-600"
                }`}
              >
                {isSelected && <Check size={14} />}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default PreferredSource

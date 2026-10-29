import { CATEGORIES } from "@/features/news/types/Articles"
import { cn } from "@/lib/utils"
import { Check, Tag } from "lucide-react"
import usePreferences from "../store/usePreferences"

const PreferredCategory = () => {
  const { preferredCategory, toggleCategory } = usePreferences()

  return (
    <section>
      <div className="mb-2 flex items-center gap-2">
        <Tag size={14} className="text-blue-600 dark:text-blue-400" />
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-300">
          Preferred Category
        </h2>
      </div>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Filter your feed to category you care about. If none are selected, all
        categories are displayed.
      </p>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isSelected = preferredCategory.includes(cat)
          return (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}

              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all",
                "dark:hover:bg-gray-750 bg-gray-200 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300",
                {
                  "bg-blue-600! text-white shadow-sm": isSelected,
                }
              )}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
              {isSelected && <Check size={14} />}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default PreferredCategory

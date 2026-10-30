import { Check, RotateCcw } from "lucide-react"
import usePreferences from "../store/usePreferences"
import useFilter from "@/features/news/hooks/useFilter"

const PreferencesHeader = () => {
  const { resetPreferences, preferredSource, preferredCategory } =
    usePreferences()
  const { setAllFilters } = useFilter()
  return (
    <div>
      <div>
        <p className="font-semibold text-accent-foreground">
          Customize your personalized news feed.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          your preferences will applied in the first load if there is now params
          in the url or by click on apply preferences button
        </p>
      </div>
      <div className="mt-2 flex justify-end gap-1">
        <button
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to reset all preferences to default?"
              )
            ) {
              resetPreferences()
            }
          }}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          title="Reset preferences to default"
        >
          <RotateCcw size={14} />
        </button>
        <button
          onClick={() => {
            setAllFilters({
              category: preferredCategory,
              source: preferredSource,
            })
          }}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          title="Apply Preferences"
        >
          <Check size={14} />
        </button>
      </div>
    </div>
  )
}

export default PreferencesHeader

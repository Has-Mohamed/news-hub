import { RotateCcw } from "lucide-react"
import usePreferences from "../store/usePreferences"

const PreferencesHeader = () => {
  const { resetPreferences } = usePreferences()
  return (
    <div className="flex items-center justify-between">
      <p className="font-semibold text-accent-foreground">
        Customize your personalized news feed.
      </p>
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
    </div>
  )
}

export default PreferencesHeader

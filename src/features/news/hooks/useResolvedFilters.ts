import usePreferences from "@/features/preferences/store/usePreferences"
import useFiltersParams, { type Filters } from "./useFiltersParams"
import type { NewsSource } from "../types/Articles"

const DEFAULT_FILTERS: Filters = {
  search: "",
  category: [],
  source: [],
  from: "",
  to: "",
}

function hasAnyValue(filters?: Partial<Filters>) {
  if (!filters) return false
  return Object.values(filters).some((value) => {
    if (Array.isArray(value)) return value.length > 0
    return Boolean(value)
  })
}

interface ResolveFiltersParams {
  urlFilters: Filters
  preferences: {
    preferredSource: NewsSource[]
    preferredCategory: string[]
  }
}

export function resolveFilters({
  urlFilters,
  preferences,
}: ResolveFiltersParams) {
  if (hasAnyValue(urlFilters)) {
    return {
      filters: { ...DEFAULT_FILTERS, ...urlFilters },
      origin: "url" as const,
    }
  }

  const preferenceFilters = {
    source: preferences.preferredSource,
    category: preferences.preferredCategory,
  }

  if (hasAnyValue(preferenceFilters)) {
    return {
      filters: { ...DEFAULT_FILTERS, ...preferenceFilters },
      origin: "preferences" as const,
    }
  }

  return { filters: DEFAULT_FILTERS, origin: "defaults" as const }
}

// Thin hook that connects your two hooks
export function useResolvedFilters() {
  const { filters: urlFilters, setAllFilters } = useFiltersParams()
  const { preferredSource, preferredCategory, hasBeenUsed, setHasBeenUsed } =
    usePreferences()

  const { filters, origin } = resolveFilters({
    urlFilters,
    preferences: { preferredSource, preferredCategory },
  })

  const applyPreferences = () => {
    setAllFilters({
      ...(preferredSource && { source: preferredSource.join(",") }),
      ...(preferredCategory?.length && {
        category: preferredCategory.join(","),
      }),
    })
  }

  if (origin === "preferences" && !hasBeenUsed) {
    setTimeout(() => {
      // sync "filter" and "search params" when origin is preferences
      applyPreferences()

      // to make sure that the preferences are applied only once per session
      // so the user can change filters later manually
      setHasBeenUsed(true)
    }, 0)
  }

  return { filters, origin, applyPreferences }
}

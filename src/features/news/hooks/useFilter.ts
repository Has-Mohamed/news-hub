import { useCallback, useEffect, useRef, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import debounce from "@/lib/debounce"
import usePreferences from "@/features/preferences/store/usePreferences"
import {
  useFilterStore,
  type FilterKey,
  type Filters,
  DEFAULT_FILTERS,
} from "../store/useFilterStore"
import type { NewsSource } from "../types/Articles"

// ─── Helpers ────────────────────────────────────────────────────────────────

function parseSearchParams(searchParams: URLSearchParams): Partial<Filters> {
  const result: Partial<Filters> = {}

  const search = searchParams.get("search")
  if (search) result.search = search

  const from = searchParams.get("from")
  if (from) result.from = from

  const to = searchParams.get("to")
  if (to) result.to = to

  const source = searchParams.get("source")
  if (source) result.source = source.split(",").filter(Boolean) as NewsSource[]

  const category = searchParams.get("category")
  if (category) result.category = category.split(",").filter(Boolean)

  return result
}

function hasAnyParam(searchParams: URLSearchParams): boolean {
  return ["search", "from", "to", "source", "category"].some((key) =>
    searchParams.get(key)
  )
}

function filtersToRecord(filters: Filters): Record<string, string> {
  const record: Record<string, string> = {}
  if (filters.search) record.search = filters.search
  if (filters.from) record.from = filters.from
  if (filters.to) record.to = filters.to
  if (filters.source.length) record.source = filters.source.join(",")
  if (filters.category.length) record.category = filters.category.join(",")
  return record
}

let hasBootstrapped = false

export function useFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { preferredSource, preferredCategory } = usePreferences()

  const {
    filters,
    inputSearch,
    setFilters,
    setInputSearch,
    setAllFilters,
    clearFilters: storeClearFilters,
    setReady,
  } = useFilterStore()

  useEffect(() => {
    if (hasBootstrapped) return
    hasBootstrapped = true

    if (hasAnyParam(searchParams)) {
      // URL already has filters — parse them into state
      const parsed = parseSearchParams(searchParams)
      setAllFilters({ ...DEFAULT_FILTERS, ...parsed })
    } else if (preferredSource.length || preferredCategory.length) {
      // No URL params → apply preferences (once per session)
      const fromPrefs: Filters = {
        ...DEFAULT_FILTERS,
        source: [...preferredSource],
        category: [...preferredCategory],
      }
      setAllFilters(fromPrefs)
      // Reflect preferences in URL immediately (replace so no history entry)
      setSearchParams(filtersToRecord(fromPrefs), { replace: true })
    }

    // Mark filters as ready so consumers (useNews) can start fetching.
    setReady()
  }, [])

  // Sync state -> URL
  //  skip the very first render by checking `hasBootstrapped`.
  useEffect(() => {
    if (!hasBootstrapped) return
    setSearchParams(filtersToRecord(filters), { replace: true })
  }, [filters])

  // useRef ensures getting the same debounced function instance for the
  // lifetime of this component
  const debouncedSetSearch = useRef(
    debounce((value: string) => {
      useFilterStore.getState().setFilters({ search: value })
    }, 400)
  ).current

  const setFilterValue = useCallback(
    (key: FilterKey, value: string | string[]) => {
      if (key === "search") {
        const str = Array.isArray(value) ? (value[0] ?? "") : value
        setInputSearch(str)
        if (!str) {
          debouncedSetSearch.cancel?.()
          setFilters({ search: "" })
        } else {
          debouncedSetSearch(str)
        }
        return
      }

      if (key === "source") {
        const sources: NewsSource[] = Array.isArray(value)
          ? (value as NewsSource[])
          : (value.split(",").filter(Boolean) as NewsSource[])
        setFilters({ source: sources })
        return
      }

      if (key === "category") {
        const cats = Array.isArray(value)
          ? value
          : value.split(",").filter(Boolean)
        setFilters({ category: cats })
        return
      }

      // from / to — scalar strings
      const str = Array.isArray(value) ? (value[0] ?? "") : value
      setFilters({ [key]: str })
    },
    [debouncedSetSearch, setFilters, setInputSearch]
  )

  // Replace all filters at once (e.g. re-applying preferences).
  const setAllFiltersPublic = useCallback(
    (payload: {
      source?: string | NewsSource[]
      category?: string | string[]
      search?: string
      from?: string
      to?: string
    }) => {
      const next: Filters = { ...DEFAULT_FILTERS }
      if (payload.search !== undefined) next.search = payload.search
      if (payload.from !== undefined) next.from = payload.from
      if (payload.to !== undefined) next.to = payload.to
      if (payload.source !== undefined) {
        next.source = Array.isArray(payload.source)
          ? (payload.source as NewsSource[])
          : (payload.source.split(",").filter(Boolean) as NewsSource[])
      }
      if (payload.category !== undefined) {
        next.category = Array.isArray(payload.category)
          ? payload.category
          : payload.category.split(",").filter(Boolean)
      }
      setAllFilters(next)
    },
    [setAllFilters]
  )

  /** Clear non-search filters. Preserves the current search term. */
  const clearFilters = useCallback(() => {
    storeClearFilters()
  }, [storeClearFilters])

  const hasFilters = useMemo(() => {
    return !!(
      filters.from ||
      filters.to ||
      filters.source.length ||
      filters.category.length
    )
  }, [filters])

  return {
    filters,
    inputSearch,
    hasFilters,
    setFilterValue,
    setAllFilters: setAllFiltersPublic,
    clearFilters,
  }
}

export default useFilter

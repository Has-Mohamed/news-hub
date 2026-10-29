import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { NewsSource } from "../types/Articles"
import debounce from "@/lib/debounce"

export type FilterKey = "search" | "from" | "to" | "source" | "category"
export type Filters = {
  search: string
  from: string
  to: string
  source: NewsSource[]
  category: string[]
}

type SetAllFilters = (filters: { source?: string; category?: string }) => void
export type FilterParams = {
  setFilterValue: (key: FilterKey, value: string | string[]) => void
  getSearchValue: (key: FilterKey) => string | null
  localSearch: string
  filters: Filters
  hasFilters: boolean
  clearFilters: () => void
  setAllFilters: SetAllFilters
}

const useFiltersParams = (): FilterParams => {
  const [searchParams, setSearchParams] = useSearchParams(
    window.location.search
  )

  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const debouncedSearch = searchParams.get("search") || ""

  const sourceValues = useMemo(() => {
    const source = searchParams.get("source")
    return (source?.split(",") as NewsSource[]) || []
  }, [searchParams])

  const categoryValues = useMemo(() => {
    const category = searchParams.get("category")
    return category?.split(",") || []
  }, [searchParams])

  // I know that every time I call useFiltersParams, it will create a new instance of localSearch
  // but I just use it to display the search value in the search input, not for the query key
  // why I didn’t use searchParams in search input instead of localSearch ? we can discuss it later :D :D
  const [localSearch, setLocalSearch] = useState(() => debouncedSearch)

  const hasFilters = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    params.delete("search")
    return !!params.size
  }, [searchParams])

  const filters = {
    search: debouncedSearch,
    from,
    to,
    source: sourceValues,
    category: categoryValues,
  }

  const debounceSetFilterValue = useMemo(
    () =>
      debounce(
        (key: FilterKey, value: string) =>
          setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            if (value) next.set(key, value)
            else next.delete(key)
            return next
          }),
        400
      ),
    [searchParams]
  )

  const handleSearch = (key: FilterKey, value: string) => {
    setLocalSearch(value)
    debounceSetFilterValue(key, value)
  }

  const handleMultiSelect = (key: FilterKey, values: string[]) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (values.length) next.set(key, values.join(","))
      else next.delete(key)
      return next
    })
  }

  const setFilterValue = (key: FilterKey, value: string | string[]) => {
    if (Array.isArray(value)) return handleMultiSelect(key, value)
    if (key === "search") return handleSearch(key, value)

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) next.set(key, value)
      else next.delete(key)
      return next
    })
  }

  const getSearchValue = (key: FilterKey) => {
    return searchParams.get(key)
  }

  const clearFilters = () => {
    if (debouncedSearch) {
      setSearchParams({ search: debouncedSearch })
    } else {
      setSearchParams({})
    }
  }

  const setAllFilters: SetAllFilters = (filters) => {
    setSearchParams(filters)
  }

  return {
    setFilterValue,
    getSearchValue,
    localSearch,
    filters,
    hasFilters,
    clearFilters,
    setAllFilters,
  }
}

export default useFiltersParams

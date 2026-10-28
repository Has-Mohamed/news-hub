import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { NewsSource } from "../types/Articles"
import debounce from "@/lib/debounce"

export type FilterKey = "search" | "from" | "to" | "source" | "category"

type FilterParams = {
  setFilterValue: (key: FilterKey, value: string) => void
  getSearchValue: (key: FilterKey) => string | null
  debouncedSearch: string
  filters: {
    search: string
    from: string
    to: string
    source: NewsSource | null
    category: string
  }
  hasFilters: boolean
  clearFilters: () => void
}

const useFiltersParams = (): FilterParams => {
  const [searchParams, setSearchParams] = useSearchParams()

  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const source = (searchParams.get("source") as NewsSource) || null
  const category = searchParams.get("category") || ""
  const debouncedSearch = searchParams.get("search") || ""

  const [localSearch, setLocalSearch] = useState(debouncedSearch)

  const hasFilters = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    params.delete("search")
    return !!params.size
  }, [searchParams])

  const filters = {
    search: localSearch,
    from,
    to,
    source,
    category,
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

  const setFilterValue = (key: FilterKey, value: string) => {
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

  return {
    setFilterValue,
    getSearchValue,
    debouncedSearch,
    filters,
    hasFilters,
    clearFilters,
  }
}

export default useFiltersParams

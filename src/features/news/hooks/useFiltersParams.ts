import { useDebounce } from "@/shared/hooks/useDebounce"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export type FilterKey = "search" | "from" | "to" | "source" | "category"

const useFiltersParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get("search") || ""
  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const source = searchParams.get("source") || "all"
  const category = searchParams.get("category") || "all"
  const debouncedSearch = useDebounce(search)

  const hasFilters = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    params.delete("search")
    return !!params.size
  }, [searchParams])

  const filters = {
    search,
    from,
    to,
    source,
    category,
  }

  const setFilterValue = (key: FilterKey, value: string) => {
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
    if (search) {
      setSearchParams({ search })
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

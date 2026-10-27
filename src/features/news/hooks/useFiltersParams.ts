import { useDebounce } from "@/shared/hooks/useDebounce"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export type FilterKey = "q" | "from" | "to" | "source" | "category"

const useFiltersParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const q = searchParams.get("q") || ""
  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const source = searchParams.get("source") || "all"
  const category = searchParams.get("category") || "all"
  const debouncedSearch = useDebounce(q)

  const hasFilters = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    params.delete("q")
    return !!params.size
  }, [searchParams])

  const filters = {
    q,
    from,
    to,
    source,
    category,
  }

  const setSearchValue = (key: FilterKey, value: string) => {
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
    if (q) {
      setSearchParams({ q })
    } else {
      setSearchParams({})
    }
  }

  return {
    setSearchValue,
    getSearchValue,
    debouncedSearch,
    filters,
    hasFilters,
    clearFilters,
  }
}

export default useFiltersParams

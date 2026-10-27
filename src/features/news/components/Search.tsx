import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import useFiltersParams from "../hooks/useFiltersParams"

const NewsSearch = () => {
  const { setSearchValue, filters } = useFiltersParams()

  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
      />
      <Input
        placeholder="Search news..."
        className="h-auto w-full rounded-xl border border-gray-200 bg-white py-3 pr-10 pl-10 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400"
        value={filters.q}
        onChange={(e) => setSearchValue("q", e.target.value)}
      />
      {filters.q && (
        <button
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          aria-label="Clear search"
          onClick={() => setSearchValue("q", "")}
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export default NewsSearch

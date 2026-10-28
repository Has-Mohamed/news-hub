import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar1Icon, FilterIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import useFiltersParams from "../hooks/useFiltersParams"
import { CATEGORIES, SOURCE_LABELS } from "../types/Articles"

const formatDate = (date: string) => {
  if (!date) return ""

  const d = new Date(date)
  return d.toDateString()
}

const NewsFilters = () => {
  const { filters, setFilterValue, clearFilters, hasFilters } =
    useFiltersParams()

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon size={14} /> <span>Filters</span>
        </div>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearFilters()
            }}
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {/* from date */}
        <Popover>
          <PopoverTrigger className="w-full flex-1 sm:w-fit">
            <Button variant="outline" className="h-10 w-full justify-start">
              <Calendar1Icon size={16} />{" "}
              {formatDate(filters.from) || "From Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filters.from ? new Date(filters.from) : undefined}
              onSelect={(e) => {
                setFilterValue("from", e ? e.toISOString() : "")
              }}
            />
          </PopoverContent>
        </Popover>

        {/* to date */}
        <Popover>
          <PopoverTrigger className="w-full flex-1 sm:w-fit">
            <Button variant="outline" className="h-10 w-full justify-start">
              <Calendar1Icon size={16} /> {formatDate(filters.to) || "To Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filters.to ? new Date(filters.to) : undefined}
              onSelect={(e) => {
                setFilterValue("to", e ? e.toISOString() : "")
              }}
            />
          </PopoverContent>
        </Popover>

        {/* source */}
        <Select
          defaultValue=""
          value={filters.source}
          onValueChange={(e) => {
            setFilterValue("source", e || "")
          }}
          items={Object.entries(SOURCE_LABELS).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
        >
          <SelectTrigger className="h-10! w-full flex-1 sm:w-fit">
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="">All Sources</SelectItem>
              {Object.entries(SOURCE_LABELS).map(([key, value]) => (
                <SelectItem value={key} key={key} className="capitalize">
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* categories */}
        <Select
          value={filters.category}
          items={CATEGORIES.map((category) => ({
            value: category,
            label: category,
          }))}
          onValueChange={(e) => {
            setFilterValue("category", e || "")
          }}
        >
          <SelectTrigger className="h-10! w-full flex-1 sm:w-fit">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="">All Categories</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem
                  value={category}
                  key={category}
                  className="capitalize"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default NewsFilters

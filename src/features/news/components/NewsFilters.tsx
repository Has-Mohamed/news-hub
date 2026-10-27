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

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
]

const sources = ["guardian", "news-api", "new-york-times"]

const NewsFilters = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <FilterIcon size={14} /> <span>Filters</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* from date */}
        <Popover>
          <PopoverTrigger className="w-full flex-1 sm:w-fit">
            <Button variant="outline" className="h-10 w-full justify-start">
              <Calendar1Icon size={16} /> From Date
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar />
          </PopoverContent>
        </Popover>

        {/* to date */}
        <Popover>
          <PopoverTrigger className="w-full flex-1 sm:w-fit">
            <Button variant="outline" className="h-10 w-full justify-start">
              <Calendar1Icon size={16} /> To Date
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar />
          </PopoverContent>
        </Popover>

        {/* source */}
        <Select defaultValue="all">
          <SelectTrigger className="h-10! w-full flex-1 sm:w-fit">
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Sources</SelectItem>
              {sources.map((source) => (
                <SelectItem value={source} key={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* categories */}
        <Select defaultValue="all">
          <SelectTrigger className="h-10! w-full flex-1 sm:w-fit">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem value={category} key={category}>
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

import { Newspaper } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "../ui/ThemeToggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="group flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 transition-transform group-hover:scale-105">
              <Newspaper size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              News<span className="text-blue-600">Hub</span>
            </span>
          </Link>
          <div className="ml-2 border-l border-gray-200 pl-2 dark:border-gray-700">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

import { Plus, Sparkles, User, X } from "lucide-react"
import usePreferences from "../store/usePreferences"
import { toast } from "@/components/ui/toast"

const PreferredAuthors = () => {
  const { preferredAuthors, addAuthor, removeAuthor } = usePreferences()

  const handleAddAuthor = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const newAuthor = form.author.value

    if (!newAuthor.trim()) {
      toast.add({
        type: "error",
        description: "Please enter an author name",
        data: {
          className: "!fixed !left-4 !bottom-4 !w-max !bg-red-100",
        },
      })
      return
    }

    if (preferredAuthors.includes(newAuthor.trim())) {
      toast.add({
        type: "error",
        description: "Author already added",
        data: {
          className: "!fixed !left-4 !bottom-4 !w-max !bg-red-100",
        },
      })
      return
    }
    form.author.value = ""
    addAuthor(newAuthor.trim())
  }
  return (
    <section>
      <div className="mb-2 flex items-center gap-2">
        <User size={14} className="text-blue-600 dark:text-blue-400" />
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-300">
          Preferred Authors
        </h2>
      </div>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Add specific journalists or bylines. Articles written by these authors
        will be prioritized and highlighted in your feed.
      </p>

      <form onSubmit={handleAddAuthor} className="mb-4">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            id="author"
            name="author"
            placeholder="e.g. Maggie Haberman, John Markoff..."
            className="flex-1 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          />
          <button
            type="submit"
            className="inline-flex w-fit items-center gap-1.5 self-end rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Plus size={14} />
            Add
          </button>
        </div>
      </form>

      {preferredAuthors.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {preferredAuthors.map((author) => (
            <span
              key={author}
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/70 py-1 pr-2 pl-3 text-xs font-medium text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300"
            >
              <Sparkles size={12} className="text-blue-500" />
              {author}
              <button
                type="button"
                onClick={() => removeAuthor(author)}
                className="rounded-full p-0.5 text-blue-500 hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-blue-800 dark:hover:text-blue-200"
                aria-label={`Remove ${author}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic dark:text-gray-500">
          No authors added yet.
        </p>
      )}
    </section>
  )
}

export default PreferredAuthors

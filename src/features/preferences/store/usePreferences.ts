import type { Category, NewsSource } from "@/features/news/types/Articles"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface PreferencesState {
  // Source
  preferredSource: NewsSource[]
  toggleSource: (source: NewsSource) => void

  //Category
  preferredCategory: Category[]
  toggleCategory: (category: Category) => void

  //Author
  preferredAuthors: string[]
  addAuthor: (author: string) => void
  removeAuthor: (author: string) => void

  //  flag to check if has been used at least once by the user to fetch data
  hasBeenUsed: boolean
  setHasBeenUsed: (hasBeenUsed: boolean) => void

  //reset
  resetPreferences: () => void
}

const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      // Source
      preferredSource: [],
      toggleSource: (source) =>
        set((state) => ({
          preferredSource: state.preferredSource.includes(source)
            ? state.preferredSource.filter((s) => s !== source)
            : [...state.preferredSource, source],
        })),

      //Category
      preferredCategory: [],
      toggleCategory: (preferredCategory) =>
        set((state) => ({
          preferredCategory: state.preferredCategory.includes(preferredCategory)
            ? state.preferredCategory.filter((c) => c !== preferredCategory)
            : [...state.preferredCategory, preferredCategory],
        })),

      //Author
      preferredAuthors: [],
      addAuthor: (author: string) =>
        set((state) => ({
          preferredAuthors: [...state.preferredAuthors, author],
        })),
      removeAuthor: (author: string) =>
        set((state) => ({
          preferredAuthors: state.preferredAuthors.filter((a) => a !== author),
        })),

      // flag to check if has been used at least once by the user to fetch data
      hasBeenUsed: false,
      setHasBeenUsed: (hasBeenUsed: boolean) => set(() => ({ hasBeenUsed })),

      //reset
      resetPreferences: () =>
        set(() => ({
          preferredSource: [],
          preferredCategory: [],
          preferredAuthors: [],
        })),
    }),
    {
      name: "preferences",
      partialize: (state) => ({
        ...state,
        hasBeenUsed: false,
      }),
    }
  )
)

export default usePreferences

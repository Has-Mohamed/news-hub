import { create } from "zustand"
import type { NewsSource } from "../types/Articles"

export type FilterKey = "search" | "from" | "to" | "source" | "category"

export interface Filters {
  search: string
  from: string
  to: string
  source: NewsSource[]
  category: string[]
}

export const DEFAULT_FILTERS: Filters = {
  search: "",
  from: "",
  to: "",
  source: [],
  category: [],
}

interface FilterStoreState {
  filters: Filters
  inputSearch: string
  /**
   * Consumers like `useNews` should wait for this
   * before firing queries, to avoid a stale-empty-filters fetch.
   */
  isReady: boolean

  setFilters: (partial: Partial<Filters>) => void

  setInputSearch: (value: string) => void

  clearFilters: () => void

  setAllFilters: (filters: Filters) => void

  setReady: () => void
}

export const useFilterStore = create<FilterStoreState>((set) => ({
  filters: { ...DEFAULT_FILTERS },
  inputSearch: "",
  isReady: false,

  setFilters: (partial) =>
    set((state) => ({
      filters: { ...state.filters, ...partial },
    })),

  setInputSearch: (value) => set({ inputSearch: value }),

  clearFilters: () =>
    set((state) => ({
      filters: {
        ...state.filters,
        from: "",
        to: "",
        source: [],
        category: [],
      },
    })),

  setAllFilters: (filters) => set({ filters, inputSearch: filters.search }),

  setReady: () => set({ isReady: true }),
}))

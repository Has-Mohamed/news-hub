import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { router } from "@/providers/router.tsx"
import { ThemeProvider } from "@/providers/theme-provider.tsx"
import { RouterProvider } from "react-router-dom"
import "./index.css"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)

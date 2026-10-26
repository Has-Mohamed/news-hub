import { createBrowserRouter } from "react-router-dom"

import App from "@/App"
import ErrorPage from "@/pages/ErrorPage"
import NewsPage from "@/pages/NewsPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <NewsPage /> }],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
])

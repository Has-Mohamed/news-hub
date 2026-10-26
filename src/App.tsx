import { Outlet } from "react-router-dom"
import { Layout } from "./components/layout/Layout"

export function App() {
  return (
    <div className="flex min-h-svh min-w-full p-6">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  )
}

export default App

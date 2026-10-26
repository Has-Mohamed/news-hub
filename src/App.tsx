import { Outlet } from "react-router-dom"

export function App() {
  return (
    <div className="flex min-h-svh p-6">
      <Outlet />
    </div>
  )
}

export default App

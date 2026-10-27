import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const ErrorPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
      <h1 className="text-7xl font-extrabold tracking-tight">404</h1>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage

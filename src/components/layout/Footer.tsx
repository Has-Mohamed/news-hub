const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-6 dark:border-gray-800">
      <div className="container-custom text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} NewsHub.</p>
        <p className="mt-1">
          Powered by NewsAPI, The Guardian & New York Times APIs.
        </p>
      </div>
    </footer>
  )
}

export default Footer

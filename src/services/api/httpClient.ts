export async function httpClient<T>({
  url,
  options = {},
  errorMsg,
}: {
  url: string
  options?: RequestInit
  errorMsg?: string
}): Promise<T> {
  const res = await fetch(url, {
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(error?.message ?? errorMsg)
  }

  return res.status === 204 ? (null as T) : res.json()
}

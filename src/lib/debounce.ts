export interface DebouncedFn<Args extends unknown[]> {
  (...args: Args): void
  /** Cancel any pending invocation. */
  cancel: () => void
}

const debounce = <Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number = 300
): DebouncedFn<Args> => {
  let timeout: ReturnType<typeof setTimeout> | undefined

  const debounced = (...args: Args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }

  debounced.cancel = () => {
    clearTimeout(timeout)
    timeout = undefined
  }

  return debounced
}

export default debounce

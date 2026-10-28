const debounce = <Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number = 300
) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}

export default debounce

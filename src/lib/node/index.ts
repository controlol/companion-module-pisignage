export const getErrorString = (error: unknown, prefix: string, fallback: string = "Unknown error") => {
  let message = fallback
  if (error instanceof Error) {
    message = error.message
  }

  if (prefix) return `${prefix}: ${message}`
  return message
}

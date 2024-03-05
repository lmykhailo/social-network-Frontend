export const sanitizeUsername = (displayName: string) => {
  return displayName
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w-]+/g, '')
}

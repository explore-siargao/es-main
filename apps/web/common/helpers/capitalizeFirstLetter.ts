export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return "" // Handle empty string or null
  return text.charAt(0).toUpperCase() + text.slice(1)
}

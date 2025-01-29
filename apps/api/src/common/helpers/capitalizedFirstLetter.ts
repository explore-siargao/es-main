export const capitalizeFirstLetter = (text: string) => {
    if (!text) return text // Handle empty strings
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }
  
const normalizeDate = (date: Date | string) => {
  const normalized = new Date(date)
  normalized.setHours(0, 0, 0, 0)
  return normalized
}

export default normalizeDate

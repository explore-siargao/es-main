type QueryValue = number | string | "any"
type QueryObject = { [key: string]: QueryValue }

export function parseQueryToObject(fullUrl: string): QueryObject {
  const queryString = fullUrl.split("?")[1] || ""
  const params = new URLSearchParams(queryString)
  const result: QueryObject = {}

  params.forEach((value, key) => {
    if (value === "any") {
      result[key] = "any"
    } else if (!isNaN(Number(value)) && value.trim() !== "") {
      result[key] = Number(value)
    } else if (!isNaN(Date.parse(value))) {
      result[key] = value
    } else {
      result[key] = value
    }
  })

  return result
}

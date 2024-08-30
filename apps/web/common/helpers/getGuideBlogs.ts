import { WEB_URL } from "../constants/ev"

export const getGuideBlogs = async (slug: string, category: string) => {
  let endpoint

  if (category === "surf") {
    endpoint = "surfs/guide"
  } else if (category === "restaurant") {
    endpoint = "restaurants/guide"
  } else if (category === "location") {
    endpoint = "locations/guide"
  } else if (category === "general") {
    endpoint = "blogs/general"
  } else if (category === "legal") {
    endpoint = "legals/about"
  }

  const res = await fetch(`${WEB_URL}/cms/api/${endpoint}/${slug}`)

  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`)
  }

  const data = await res.json()

  return data ? data.docs[0] : null
}

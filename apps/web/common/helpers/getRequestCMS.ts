import { WEB_URL } from "../constants/ev"

const CACHE_REVALIDATE = 60
export const getRequestCMS = async (endpoint: string) => {
  const res = await fetch(`${WEB_URL}/cms/api${endpoint}`, {
    next: { revalidate: CACHE_REVALIDATE },
  })

  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`)
  }

  const data = await res.json()

  return data ? data.docs[0] : null
}

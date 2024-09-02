import { CACHE_ONE_MINUTE } from "next/dist/lib/constants"
import { WEB_URL } from "../constants/ev"

export const getRequestCMS = async (endpoint: string) => {
  const res = await fetch(`${WEB_URL}/cms/api${endpoint}`, {
    next: { revalidate: CACHE_ONE_MINUTE },
  })

  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`)
  }

  const data = await res.json()

  return data ? data.docs[0] : null
}

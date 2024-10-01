import { API_ROOT, MOCK_ROOT } from "@repo/constants"

const CACHE_REVALIDATE = 60
export async function getRequest(url: string, isMock?: false) {
  const ROOT_PATH = isMock ? MOCK_ROOT : API_ROOT
  const res = await fetch(`${process.env.WEB_URL}${ROOT_PATH}${url}`, {
    next: { revalidate: CACHE_REVALIDATE },
  })
  if (!res.ok) {
    return {
      error: true,
    }
  }
  const jsonData = await res.json()
  return jsonData
}

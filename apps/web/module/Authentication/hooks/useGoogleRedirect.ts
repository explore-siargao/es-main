import { API_URL_USERS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"
import { ApiService } from "@/common/service/api"
import { useSearchParams } from "next/navigation"

export async function googleRedirect(allSearchParams: string) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_USERS}/auth/google/redirect?${allSearchParams}`
  )
}

function useGoogleRedirect() {
  const searchParams = useSearchParams()
  const allSearchParams = searchParams.toString()
  const query = useQuery({
    queryKey: ["google-redirect"],
    queryFn: () => googleRedirect(allSearchParams),
    enabled: !!allSearchParams,
  })
  return query
}

export default useGoogleRedirect

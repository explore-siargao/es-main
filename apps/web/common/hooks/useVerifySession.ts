import { API_URL_USERS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"
import { ApiService } from "@/common/service/api"
import { FIFTEEN_MINUTES, TWELVE_MINUTES } from "../constants"

export async function verifySession() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_USERS}/auth/verify-session`)
}

function useVerifySession() {
  const query = useQuery({
    queryKey: ["session"],
    queryFn: () => verifySession(),
    gcTime: FIFTEEN_MINUTES,
    staleTime: TWELVE_MINUTES,
  })
  return query
}

export default useVerifySession

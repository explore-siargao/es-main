import { API_URL_USERS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"
import { ApiService } from "@/common/service/api"
import { FIFTEEN_MINUTES, TWELVE_MINUTES } from "../constants"

export async function getSessionUser() {
  const apiService = new ApiService("v2")
  return await apiService.get(`${API_URL_USERS}/auth/info`)
}

function useGetSessionUser() {
  const query = useQuery({
    queryKey: ["session-user"],
    queryFn: () => getSessionUser(),
    gcTime: FIFTEEN_MINUTES,
    staleTime: TWELVE_MINUTES,
  })
  return query
}

export default useGetSessionUser

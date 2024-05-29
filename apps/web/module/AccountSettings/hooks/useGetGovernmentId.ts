import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getGovernmentIds(personId: number | null) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_USERS}/${personId}/government-id`)
}

function useGetGovernmentId(personId: number | null) {
  const query = useQuery({
    queryKey: ["government-id", personId],
    queryFn: () => getGovernmentIds(personId),
    refetchOnWindowFocus: false,
    enabled: !!personId,
  })
  return query
}
export default useGetGovernmentId

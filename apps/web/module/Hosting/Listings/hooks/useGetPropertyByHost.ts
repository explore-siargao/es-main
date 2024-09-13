import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getPropertyByHost(hostId: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_PROPERTIES}/offer-by/${hostId}`)
}

function useGetPropertyByHost(hostId: number | undefined) {
  const query = useQuery({
    queryKey: ["properties", hostId],
    queryFn: () => getPropertyByHost(hostId),
    refetchOnWindowFocus: false,
    enabled: !!hostId,
  })
  return query
}
export default useGetPropertyByHost

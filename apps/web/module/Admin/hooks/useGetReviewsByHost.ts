import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReviewsByHost(hostId: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/reviews/host/${hostId}`)
}

function useGetReviewsByHost(hostId: number | undefined) {
  const query = useQuery({
    queryKey: ["reviews", hostId],
    queryFn: () => getReviewsByHost(hostId),
    refetchOnWindowFocus: false,
    enabled: !!hostId,
  })
  return query
}
export default useGetReviewsByHost

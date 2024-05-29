import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getHouseRuleByListing(listingId: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/house-rules/${listingId}`)
}

function useGetHouseRulesByListing(listingId: number | undefined) {
  const query = useQuery({
    queryKey: ["house-rules", listingId],
    queryFn: () => getHouseRuleByListing(listingId),
    refetchOnWindowFocus: false,
    enabled: !!listingId,
  })
  return query
}
export default useGetHouseRulesByListing

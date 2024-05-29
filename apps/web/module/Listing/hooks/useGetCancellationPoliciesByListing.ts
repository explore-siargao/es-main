import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getCancellationPoliciesByListingId(
  listingId: number | undefined
) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_LISTINGS}/cancellation-policies/${listingId}`
  )
}

function useGetCancellationPoliciesByListing(listingId: number | undefined) {
  const query = useQuery({
    queryKey: ["cancellation-policies", listingId],
    queryFn: () => getCancellationPoliciesByListingId(listingId),
    refetchOnWindowFocus: false,
    enabled: !!listingId,
  })
  return query
}
export default useGetCancellationPoliciesByListing

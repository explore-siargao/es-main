import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getHostDetailsInListing(
  hostId: number,
  listingId: number | undefined
) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_USERS}/${hostId}/host-details-listing/${listingId}`
  )
}

function useGetHostDetailsInListing(
  hostId: number,
  listingId: number | undefined
) {
  const query = useQuery({
    queryKey: ["host-details-listing", hostId, listingId],
    queryFn: () => getHostDetailsInListing(hostId, listingId),
    refetchOnWindowFocus: false,
    enabled: !!hostId && !!listingId,
  })
  return query
}
export default useGetHostDetailsInListing

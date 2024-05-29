import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getSafetyPropertiesByListingId(
  listingId: number | undefined
) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_LISTINGS}/safety-properties/${listingId}`
  )
}

function useGetSafetyPropertiesByListing(listingId: number | undefined) {
  const query = useQuery({
    queryKey: ["safety-properties", listingId],
    queryFn: () => getSafetyPropertiesByListingId(listingId),
    refetchOnWindowFocus: false,
    enabled: !!listingId,
  })
  return query
}
export default useGetSafetyPropertiesByListing

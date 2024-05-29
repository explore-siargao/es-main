import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getListingDescriptionByListingId(
  listingId: number | undefined
) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_LISTINGS}/listing-description/listing/${listingId}`
  )
}

function useGetListingDescriptionByListingId(listingId: number | undefined) {
  const query = useQuery({
    queryKey: ["listing-description", listingId],
    queryFn: () => getListingDescriptionByListingId(listingId),
    refetchOnWindowFocus: false,
    enabled: !!listingId,
  })
  return query
}
export default useGetListingDescriptionByListingId

import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getListingHighlightsByListingId(
  listingId: number | undefined
) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_LISTINGS}/listing-highlights/${listingId}`
  )
}

function useGetListingHighlightsByListing(listingId: number | undefined) {
  const query = useQuery({
    queryKey: ["listing-highlights", listingId],
    queryFn: () => getListingHighlightsByListingId(listingId),
    refetchOnWindowFocus: false,
    enabled: !!listingId,
  })
  return query
}
export default useGetListingHighlightsByListing

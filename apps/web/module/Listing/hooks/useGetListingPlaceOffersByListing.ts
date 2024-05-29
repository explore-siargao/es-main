import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getListingPlaceOffersByListingId(
  listingId: number | undefined
) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_LISTINGS}/listing-place-offers/${listingId}`
  )
}

function useGetListingPlaceOffersByListing(listingId: number | undefined) {
  const query = useQuery({
    queryKey: ["listing-place-offer", listingId],
    queryFn: () => getListingPlaceOffersByListingId(listingId),
    refetchOnWindowFocus: false,
    enabled: !!listingId,
  })
  return query
}
export default useGetListingPlaceOffersByListing

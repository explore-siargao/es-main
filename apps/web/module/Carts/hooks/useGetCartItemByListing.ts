import { API_URL_CARTS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getCartItemByListing(listingId: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_CARTS}/listing/${listingId}`)
}

function useGetCartItemByListing(listingId: number | undefined) {
  const query = useQuery({
    queryKey: ["carts-listing", listingId],
    queryFn: () => getCartItemByListing(listingId),
    refetchOnWindowFocus: false,
    enabled: !!listingId,
  })
  return query
}

export default useGetCartItemByListing

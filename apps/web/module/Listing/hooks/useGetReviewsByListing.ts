import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReviewByListingId(listingId: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/reviews/${listingId}`)
}

function useGetReviewsByListing(listingId: number | undefined) {
  const query = useQuery({
    queryKey: ["review", listingId],
    queryFn: () => getReviewByListingId(listingId),
    refetchOnWindowFocus: false,
    enabled: !!listingId,
  })
  return query
}
export default useGetReviewsByListing

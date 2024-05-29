import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getAllListingPlaceOffers() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/all/listing-place-offers`)
}

function useGetAllListingPlaceOffers() {
  const query = useQuery({
    queryKey: ["listing-place-offer"],
    queryFn: () => getAllListingPlaceOffers(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetAllListingPlaceOffers

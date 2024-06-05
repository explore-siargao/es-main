import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getRentalPricing(rentalId: string | undefined) {
  const apiService = new ApiService("v2")
  return await apiService.get(`${API_URL_RENTALS}/${rentalId}/pricing`)
}

function useGetRentalPricing(rentalId: string | undefined) {
  const query = useQuery({
    queryKey: ["rental-pricing", rentalId],
    queryFn: () => getRentalPricing(rentalId),
    enabled: !!rentalId,
  })
  return query
}
export default useGetRentalPricing

import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getRentalDetails(rentalId: string | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_RENTALS}/${rentalId}/details`)
}

function useGetRentalDetails(rentalId: string | undefined) {
  const query = useQuery({
    queryKey: ["rental-details", rentalId],
    queryFn: () => getRentalDetails(rentalId),
    refetchOnWindowFocus: false,
    enabled: !!rentalId,
  })
  return query
}
export default useGetRentalDetails

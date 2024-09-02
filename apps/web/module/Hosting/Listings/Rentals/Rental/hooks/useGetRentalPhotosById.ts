import { API_URL_RENTALS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getRentalPhotosById(rentalId: string | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_RENTALS}/${rentalId}/photos`)
}

function useGetRentalPhotosById(rentalId: string | undefined) {
  const query = useQuery({
    queryKey: ["rental-photos"],
    queryFn: () => getRentalPhotosById(rentalId),
    refetchOnWindowFocus: false,
    enabled: !!rentalId,
  })
  return query
}

export default useGetRentalPhotosById

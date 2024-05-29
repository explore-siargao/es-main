import { API_URL_RENTALS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getRentalPhotosById(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_RENTALS}/${id}/photos`)
}

function useGetRentalPhotosById(id: number | undefined) {
  const query = useQuery({
    queryKey: ["rental-photos"],
    queryFn: () => getRentalPhotosById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}

export default useGetRentalPhotosById

import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getAllRentals(hostId: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_RENTALS}/offer-by/${hostId}`)
}

function useGetAllRentals(hostId: number | undefined) {
  const query = useQuery({
    queryKey: ["all-rentals", hostId],
    queryFn: () => getAllRentals(hostId),
    refetchOnWindowFocus: false,
    enabled: !!hostId,
  })
  return query
}
export default useGetAllRentals

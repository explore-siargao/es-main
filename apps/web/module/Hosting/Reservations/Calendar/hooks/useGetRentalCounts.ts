import { API_URL_RENTALS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getRentalCounts() {
  const apiService = new ApiService("v2")
  return await apiService.get(`${API_URL_RENTALS}/counts/all`)
}

function useGetRentalCounts() {
  const query = useQuery({
    queryKey: ["rental-counts"],
    queryFn: () => getRentalCounts(),
  })
  return query
}

export default useGetRentalCounts

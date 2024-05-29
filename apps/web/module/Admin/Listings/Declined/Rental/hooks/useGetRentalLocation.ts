import { API_URL_RENTALS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getRentalLocation(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_RENTALS}/${id}/location`)
}

function useGetRentalLocation(id: number | undefined) {
  const query = useQuery({
    queryKey: ["rental-location", id],
    queryFn: () => getRentalLocation(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}

export default useGetRentalLocation

import { API_URL_RENTALS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getRentalLocation(id: string | undefined) {
  const apiService = new ApiService("v2")
  return await apiService.get(`${API_URL_RENTALS}/${id}/location`)
}

function useGetRentalLocation(id: string | undefined) {
  const query = useQuery({
    queryKey: ["rental-location", id],
    queryFn: () => getRentalLocation(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}

export default useGetRentalLocation

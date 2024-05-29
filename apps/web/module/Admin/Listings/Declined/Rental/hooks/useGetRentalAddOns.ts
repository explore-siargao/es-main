import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getRentalAddOns(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_RENTALS}/${id}/add-ons`)
}

function useGetRentalAddOns(id: number | undefined) {
  const query = useQuery({
    queryKey: ["rental-addOns", id],
    queryFn: () => getRentalAddOns(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}

export default useGetRentalAddOns

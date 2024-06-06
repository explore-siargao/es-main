import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getRentalAddOns(id: string | undefined) {
  const apiService = new ApiService("v2")
  return await apiService.get(`${API_URL_RENTALS}/${id}/add-ons`)
}

function useGetRentalAddOns(id: string | undefined) {
  const query = useQuery({
    queryKey: ["rental-addOns", id],
    queryFn: () => getRentalAddOns(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}

export default useGetRentalAddOns

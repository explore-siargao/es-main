import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Rental_Pricing } from "@repo/contract"

export async function updateRentalPricing(
  id: number | undefined,
  props: T_Rental_Pricing
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_RENTALS}/${id}/pricing`, props)
}

function useUpdateRentalPricing(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Rental_Pricing) => updateRentalPricing(id, props),
  })
  return query
}

export default useUpdateRentalPricing

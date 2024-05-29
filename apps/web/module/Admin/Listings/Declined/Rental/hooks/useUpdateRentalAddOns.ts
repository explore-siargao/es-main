import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Rental_AddOns } from "@repo/contract"

export async function updateRentalAddOns(
  id: number | undefined,
  props: T_Rental_AddOns
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_RENTALS}/${id}/add-ons`, props)
}

function useUpdateRentalAddOns(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Rental_AddOns) => updateRentalAddOns(id, props),
  })
  return query
}

export default useUpdateRentalAddOns

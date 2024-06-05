import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Rental_Details } from "@repo/contract"

export async function updateRentalDetails(
  id: string | undefined,
  props: T_Rental_Details
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(`${API_URL_RENTALS}/${id}/details`, props)
}
function useUpdateRentalDetails(id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Rental_Details) => updateRentalDetails(id, props),
  })
  return query
}

export default useUpdateRentalDetails

import { API_URL_RENTALS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Rental_Status } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateRentalStatus(
  rentalId: string | undefined,
  props: T_Rental_Status
) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_RENTALS}/${rentalId}/status`, props)
}

function useUpdateRentalStatusById(rentalId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Rental_Status) => updateRentalStatus(rentalId, props),
  })
  return query
}

export default useUpdateRentalStatusById

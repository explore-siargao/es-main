import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type T_RentalPricePerDate = {
  fromDate: string
  toDate: string
  dayRate: number
  requiredDeposit: number
}

export async function updateRentalPricePerDate(
  props: T_RentalPricePerDate,
  id: string
) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_RENTALS}/${id}/price-per-dates`, props)
}

function useUpdateRentalPricePerDate(id: string) {
  const query = useMutation({
    mutationFn: (props: T_RentalPricePerDate) =>
      updateRentalPricePerDate(props, id),
  })
  return query
}
export default useUpdateRentalPricePerDate

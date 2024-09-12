import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type T_RentalReservation = {
  startDate: string
  endDate: string
  id: string
}

export async function updateRentalReservation(
  props: T_RentalReservation,
  id: string
) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_RESERVATIONS}/${id}`, props)
}

function useUpdateRentalReservation(id: string) {
  const query = useMutation({
    mutationFn: (props: T_RentalReservation) =>
      updateRentalReservation(props, id),
  })
  return query
}
export default useUpdateRentalReservation

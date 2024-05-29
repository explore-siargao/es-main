import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Reservation } from "@repo/contract"

export async function updateReservation(
  id: number | null,
  props: T_Reservation
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_RESERVATIONS}/${id}`, props)
}

function useUpdateReservation(id: number | null) {
  const query = useMutation({
    mutationFn: (props: T_Reservation) => updateReservation(id, props),
  })
  return query
}
export default useUpdateReservation

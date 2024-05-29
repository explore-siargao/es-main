import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Reservation } from "@repo/contract"

export async function addReservation(
  guestId: number | undefined,
  props: T_Reservation
) {
  const apiService = new ApiService("mock")
  return await apiService.post(`${API_URL_RESERVATIONS}/${guestId}`, props)
}

function useAddReservation(guestId: number) {
  const query = useMutation({
    mutationFn: (props: T_Reservation) => addReservation(guestId, props),
  })
  return query
}
export default useAddReservation

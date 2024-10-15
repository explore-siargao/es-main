import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type T_PropertyReservation = {
  date: string
  status: string
  name: string | null
  guest_count: string | null
  slotId: string
  notes: string
}
export async function addPrivateActivityReservation(
  props: T_PropertyReservation
) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_RESERVATIONS}/activity/private`,
    props
  )
}
function useAddPrivateActivityReservation() {
  const query = useMutation({
    mutationFn: (props: T_PropertyReservation) =>
      addPrivateActivityReservation(props),
  })
  return query
}
export default useAddPrivateActivityReservation

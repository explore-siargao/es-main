import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type T_ActivityJoinerReservation = {
  date: string
  status: string
  name: string | null
  guest_count: string | null
  slotId: string
  idsId: string
  notes: string
}
export async function addJoinerActivityReservation(
  props: T_ActivityJoinerReservation
) {
  const apiService = new ApiService()
  return await apiService.post(`${API_URL_RESERVATIONS}/activity/joiner`, props)
}
function useAddJoinerActivityReservation() {
  const query = useMutation({
    mutationFn: (props: T_ActivityJoinerReservation) =>
      addJoinerActivityReservation(props),
  })
  return query
}
export default useAddJoinerActivityReservation

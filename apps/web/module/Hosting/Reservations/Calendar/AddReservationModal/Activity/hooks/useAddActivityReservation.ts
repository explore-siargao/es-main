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
export async function addActivityReservation(props: T_PropertyReservation) {
  const apiService = new ApiService()
  return await apiService.post(`${API_URL_RESERVATIONS}/activity`, props)
}
function useAddActivityReservation() {
  const query = useMutation({
    mutationFn: (props: T_PropertyReservation) => addActivityReservation(props),
  })
  return query
}
export default useAddActivityReservation

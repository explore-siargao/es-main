import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type T_PropertyReservation = {
  start_date: string
  end_date: string
  status: string
  name: string | null
  guest_count: string | null
  unitId: string
  notes: string
}
export async function addPropertyReservation(props: T_PropertyReservation) {
  const apiService = new ApiService()
  return await apiService.post(`${API_URL_RESERVATIONS}/unit`, props)
}
function useAddPropertyReservation() {
  const query = useMutation({
    mutationFn: (props: T_PropertyReservation) => addPropertyReservation(props),
  })
  return query
}
export default useAddPropertyReservation

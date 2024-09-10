import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type T_RentalReservation = {
  start_date: string
  end_date: string
  status: string
  name: string | null
  guest_count: string | null
  unit: string,
  notes: string
}
export async function addRentalReservation(props: T_RentalReservation) {
  const apiService = new ApiService()
  return await apiService.post(`${API_URL_RESERVATIONS}/rental`, props)
}
function useAddRentalReservation() {
  const query = useMutation({
    mutationFn: (props: T_RentalReservation) => addRentalReservation(props),
  })
  return query
}
export default useAddRentalReservation

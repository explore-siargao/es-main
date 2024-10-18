import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function cancelRentalReservation(props: any, id: string) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_RESERVATIONS}/rental/${id}/cancel-reservation`
  )
}

function useCancelRentalReservation(id: string) {
  const query = useMutation({
    mutationFn: (props: any) => cancelRentalReservation(props, id),
  })
  return query
}
export default useCancelRentalReservation

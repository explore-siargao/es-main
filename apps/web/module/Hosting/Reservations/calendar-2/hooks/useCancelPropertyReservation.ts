import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function cancelPropertyReservation(props: any, id: string) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_RESERVATIONS}/property/${id}/cancel-reservation`
  )
}

function useCancelPropertyReservation(id: string) {
  const query = useMutation({
    mutationFn: (props: any) => cancelPropertyReservation(props, id),
  })
  return query
}
export default useCancelPropertyReservation

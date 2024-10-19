import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function cancelActivityReservation(id: string) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_RESERVATIONS}/activity/${id}/cancel-reservation`
  )
}

function useCancelActivityReservation(id: string) {
  const query = useMutation({
    mutationFn: () => cancelActivityReservation(id),
  })
  return query
}
export default useCancelActivityReservation

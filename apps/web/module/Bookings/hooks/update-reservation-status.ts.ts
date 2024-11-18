import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS, API_URL_TRANSACTIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function updateResertvationStatus(referenceId: string) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_RESERVATIONS}/status/${referenceId}`)
}

function useUpdateReservationStatus(referenceId: string) {
  const query = useMutation({
    mutationFn: () => updateResertvationStatus(referenceId),
  })
  return query
}
export default useUpdateReservationStatus

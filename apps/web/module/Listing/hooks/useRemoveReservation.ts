import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function removeReservation(userId: number, id: number) {
  const apiService = new ApiService()
  return await apiService.delete(
    `${API_URL_LISTINGS}/${userId}/reservation-listing/${id}`
  )
}

function useRemoveReservation(userId: number, id: number) {
  const query = useMutation({
    mutationFn: () => removeReservation(userId, id),
  })
  return query
}
export default useRemoveReservation

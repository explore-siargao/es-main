import { ApiService } from "@/common/service/api"
import { API_URL_TRANSACTIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function updateTransaction(bookingId: string) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_TRANSACTIONS}/${bookingId}`)
}

function useUpdateTransaction(bookingId: string) {
  const query = useMutation({
    mutationFn: () => updateTransaction(bookingId),
  })
  return query
}
export default useUpdateTransaction

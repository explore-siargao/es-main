import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function removeHighlight(userId: number, id: number) {
  const apiService = new ApiService()
  return await apiService.delete(
    `${API_URL_LISTINGS}/${userId}/highlights/${id}`
  )
}

function useRemoveHighlight(userId: number, id: number) {
  const query = useMutation({
    mutationFn: () => removeHighlight(userId, id),
  })
  return query
}
export default useRemoveHighlight

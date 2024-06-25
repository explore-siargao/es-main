import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"
import { API_URL_ACTIVITIES } from "@/common/constants"

export async function deleteActivity(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.delete(`${API_URL_ACTIVITIES}/${id}`)
}
function useDeleteActivity(id: number) {
  const query = useMutation({
    mutationFn: () => deleteActivity(id),
  })
  return query
}
export default useDeleteActivity

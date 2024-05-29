import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"
import { API_URL_ACTIVITIES } from "@/common/constants"

export async function deleteProperty(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.delete(`${API_URL_ACTIVITIES}/${id}`)
}
function useDeleteProperty(id: number) {
  const query = useMutation({
    mutationFn: () => deleteProperty(id),
  })
  return query
}
export default useDeleteProperty

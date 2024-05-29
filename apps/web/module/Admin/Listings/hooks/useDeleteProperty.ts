import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function deleteProperty(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.delete(`${API_URL_PROPERTIES}/${id}`)
}
function useDeleteProperty(id: number | undefined) {
  const query = useMutation({
    mutationFn: () => deleteProperty(id),
  })
  return query
}
export default useDeleteProperty

import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function deleteProperty(_id: string | undefined) {
  const apiService = new ApiService("v2")
  return await apiService.delete(`${API_URL_PROPERTIES}/${_id}`)
}
function useDeleteProperty(_id: string | undefined) {
  const query = useMutation({
    mutationFn: () => deleteProperty(_id),
  })
  return query
}
export default useDeleteProperty

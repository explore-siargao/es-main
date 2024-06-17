import { useMutation } from "@tanstack/react-query"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"

export async function addActivity() {
  const apiService = new ApiService("mock")
  return await apiService.post(`${API_URL_ACTIVITIES}`, {})
}
function useAddActivity() {
  const query = useMutation({
    mutationFn: () => addActivity(),
  })
  return query
}
export default useAddActivity

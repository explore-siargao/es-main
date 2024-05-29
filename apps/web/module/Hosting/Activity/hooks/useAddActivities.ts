import { useMutation } from "@tanstack/react-query"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"

export async function addActivities() {
  const apiService = new ApiService("mock")
  return await apiService.post(`${API_URL_ACTIVITIES}`, {})
}
function useAddActivities() {
  const query = useMutation({
    mutationFn: () => addActivities(),
  })
  return query
}
export default useAddActivities

import { useMutation } from "@tanstack/react-query"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"

export async function addBlankActivity() {
  const apiService = new ApiService("mock")
  return await apiService.post(`${API_URL_ACTIVITIES}`, {})
}

function useAddBlankActivity() {
  const query = useMutation({
    mutationFn: () => addBlankActivity(),
  })
  return query
}

export default useAddBlankActivity

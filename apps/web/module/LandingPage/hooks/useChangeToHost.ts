import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function beAHost() {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_USERS}/be-host`)
}

function useChangeToHost() {
  const query = useMutation({
    mutationFn: () => beAHost(),
  })
  return query
}
export default useChangeToHost

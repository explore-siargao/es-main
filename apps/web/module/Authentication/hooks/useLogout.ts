import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { ApiService } from "@/common/service/api"

export async function logout() {
  const apiService = new ApiService()
  return await apiService.post(`${API_URL_USERS}/auth/logout2`, {})
}

function useLogout() {
  const query = useMutation({
    mutationFn: () => logout(),
  })
  return query
}

export default useLogout

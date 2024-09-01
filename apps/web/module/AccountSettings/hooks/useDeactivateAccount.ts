import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function deactivateAccount(userId: string | undefined) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_USERS}/deactivate/${userId}`)
}

function useDeactivateAccount() {
  const query = useMutation({
    mutationFn: (userId: string) => deactivateAccount(userId),
  })
  return query
}
export default useDeactivateAccount

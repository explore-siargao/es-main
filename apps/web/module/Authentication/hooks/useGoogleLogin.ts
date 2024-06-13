import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { ApiService } from "@/common/service/api"

export async function googleLogin(redirectTo?: string) {
  const apiService = new ApiService("v2")
  return await apiService.post(`${API_URL_USERS}/auth/google`, { redirectTo })
}

function useGoogleLogin() {
  const query = useMutation({
    mutationFn: (redirectTo?: string) => googleLogin(redirectTo),
  })
  return query
}

export default useGoogleLogin

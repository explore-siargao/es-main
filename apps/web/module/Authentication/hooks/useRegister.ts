import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { ApiService } from "@/common/service/api"
import { T_UserRegister } from "@repo/contract"

export async function registerUser(props: T_UserRegister) {
  const apiService = new ApiService()
  return await apiService.post(`${API_URL_USERS}/auth/register`, props)
}

function useRegister() {
  const query = useMutation({
    mutationFn: (props: T_UserRegister) => registerUser(props),
  })
  return query
}

export default useRegister

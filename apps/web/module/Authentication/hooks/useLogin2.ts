import { API_URL_USERS } from "@/common/constants"
import { IUser } from "@/common/types/global"
import { useMutation } from "@tanstack/react-query"
import { ApiService } from "@/common/service/api"

export async function loginUser(props: IUser) {
  const apiService = new ApiService()
  return await apiService.post(`${API_URL_USERS}/auth/manual`, props)
}
function useLogin2() {
  const query = useMutation({
    mutationFn: (props: IUser) => loginUser(props),
  })
  return query
}

export default useLogin2

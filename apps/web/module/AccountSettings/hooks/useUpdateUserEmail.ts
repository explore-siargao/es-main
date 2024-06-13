import { ApiService } from "@/common/service/api"
import { IUser } from "@/common/types/global"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function updateUserEmail(
  userId: number | undefined,
  props: IUser
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(`${API_URL_USERS}/auth/${userId}`, props)
}

function useUpdateUserEmail(userId: number) {
  const query = useMutation({
    mutationFn: (props: IUser) => updateUserEmail(userId, props),
  })
  return query
}
export default useUpdateUserEmail

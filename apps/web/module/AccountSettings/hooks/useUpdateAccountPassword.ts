import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export type T_ChangePassword = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export async function updateUserPassword(
  userId: number | null,
  props: T_ChangePassword
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_USERS}/change-password/${userId}`,
    props
  )
}

function useUpdateAccountPassword(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: T_ChangePassword) => updateUserPassword(userId, props),
  })
  return query
}
export default useUpdateAccountPassword

import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"
import { API_USERS_AUTH } from "../constants/api-routes"

export type TVerifyForgotPassword = {
  email: string
  code: number
  newPassword: string
}

export async function verifyForgotPassword(props: TVerifyForgotPassword) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_USERS_AUTH}/forgot-password/verify2`,
    props
  )
}

function useVerifyForgotPassword2() {
  const query = useMutation({
    mutationFn: (props: TVerifyForgotPassword) => verifyForgotPassword(props),
  })
  return query
}

export default useVerifyForgotPassword2

import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"
import { API_AUTH_FORGOT_PASSWORD_VERIFY } from "../constants/api-routes"

export type TVerifyForgotPassword = {
  email: string
  code: number
  newPassword: string
}

export async function verifyForgotPassword(props: TVerifyForgotPassword) {
  const apiService = new ApiService()
  return await apiService.post(API_AUTH_FORGOT_PASSWORD_VERIFY, props)
}

function useVerifyForgotPassword() {
  const query = useMutation({
    mutationFn: (props: TVerifyForgotPassword) => verifyForgotPassword(props),
  })
  return query
}

export default useVerifyForgotPassword

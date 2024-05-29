import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"
import { API_AUTH_FORGOT_PASSWORD } from "../constants/api-routes"

export type TForgotPassword = {
  email: string
  token: string
}

export async function forgotPassword(props: TForgotPassword) {
  const apiService = new ApiService()
  return await apiService.post(API_AUTH_FORGOT_PASSWORD, props)
}

function useForgotPassword() {
  const query = useMutation({
    mutationFn: (props: TForgotPassword) => forgotPassword(props),
  })
  return query
}

export default useForgotPassword

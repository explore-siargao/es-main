import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"
import { API_AUTH_MFA_VERIFY } from "../constants/api-routes"

export type TVerifyMultiFactor = {
  userId: string
  code: string
}

export async function verifyMultiFactor(props: TVerifyMultiFactor) {
  const apiService = new ApiService()
  return await apiService.post(API_AUTH_MFA_VERIFY, props)
}

function useVerifyMultiFactor() {
  const query = useMutation({
    mutationFn: (props: TVerifyMultiFactor) => verifyMultiFactor(props),
  })
  return query
}

export default useVerifyMultiFactor

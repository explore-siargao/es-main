import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"
import { API_AUTH_MFA } from "../constants/api-routes"

export type TMultiFactor = {
  userId: string
}

export async function multiFactor(props: TMultiFactor) {
  const apiService = new ApiService()
  return await apiService.post(API_AUTH_MFA, props)
}

function useMultiFactor() {
  const query = useMutation({
    mutationFn: (props: TMultiFactor) => multiFactor(props),
  })
  return query
}

export default useMultiFactor

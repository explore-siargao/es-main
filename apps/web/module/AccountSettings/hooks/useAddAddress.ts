import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_AddUpdateAddress } from "@repo/contract"

export async function addAddress(
  personalInfoId: string | undefined,
  props: T_AddUpdateAddress
) {
  const apiService = new ApiService("v2")
  return await apiService.post(
    `${API_URL_USERS}/${personalInfoId}/address/add`,
    props
  )
}

function useAddAddress(personalInfoId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_AddUpdateAddress) =>
      addAddress(personalInfoId, props),
  })
  return query
}
export default useAddAddress

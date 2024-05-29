import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_AddUpdateAddress } from "@repo/contract"

export async function addAddress(
  personId: number | undefined,
  props: T_AddUpdateAddress
) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_USERS}/${personId}/address/add`,
    props
  )
}

function useAddAddress(personId: number) {
  const query = useMutation({
    mutationFn: (props: T_AddUpdateAddress) => addAddress(personId, props),
  })
  return query
}
export default useAddAddress

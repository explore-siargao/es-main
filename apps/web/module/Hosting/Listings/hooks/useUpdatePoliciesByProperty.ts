import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Property_Policy } from "@repo/contract"

interface IPolicies {
  policies: T_Property_Policy[]
}
export async function updatePolicy(
  propertyId: number | undefined,
  props: IPolicies
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/policies/update`,
    props
  )
}

function useUpdatePolicies(propertyId: number | undefined) {
  const query = useMutation({
    mutationFn: (props: IPolicies) => updatePolicy(propertyId, props),
  })
  return query
}
export default useUpdatePolicies

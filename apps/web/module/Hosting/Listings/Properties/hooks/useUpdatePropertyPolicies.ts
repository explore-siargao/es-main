import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Property_Policy } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updatePropertyPolicies(
  _id: string | undefined,
  props: { policies: T_Property_Policy[] }
) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_PROPERTIES}/${_id}/policies`, props)
}

function useUpdatePropertyPolicies(_id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: { policies: T_Property_Policy[] }) =>
      updatePropertyPolicies(_id, props),
  })
  return query
}

export default useUpdatePropertyPolicies

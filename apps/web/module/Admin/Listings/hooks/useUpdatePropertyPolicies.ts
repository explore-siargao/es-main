import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Property_Policy } from "@repo/contract"

export async function updatePropertyPolicies(
  id: string | undefined,
  props: { policies: T_Property_Policy[] }
) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_PROPERTIES}/${id}/policies`, props)
}

function useUpdatePropertyPolicies(id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: { policies: T_Property_Policy[] }) =>
      updatePropertyPolicies(id, props),
  })
  return query
}

export default useUpdatePropertyPolicies

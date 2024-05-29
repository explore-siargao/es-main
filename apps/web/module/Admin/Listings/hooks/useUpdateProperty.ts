import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Property } from "@repo/contract"

export async function updateProperty(
  hostId: number | undefined,
  id: number | undefined,
  props: T_Property
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_PROPERTIES}/${hostId}/${id}`, props)
}

function useUpdateProperty(hostId: number | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Property) => updateProperty(hostId, props.id, props),
  })
  return query
}
export default useUpdateProperty

import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Property_Facility } from "@repo/contract"

export async function updatePropertyFacilities(
  id: number | undefined,
  props: { facilities: T_Property_Facility[] }
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_PROPERTIES}/${id}/facilities`, props)
}

function useUpdatePropertyFacilities(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: { facilities: T_Property_Facility[] }) =>
      updatePropertyFacilities(id, props),
  })
  return query
}

export default useUpdatePropertyFacilities

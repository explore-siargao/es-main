import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Property_Facility } from "@repo/contract"

export async function updatePropertyFacilities(
  propertyId: string | undefined,
  props: { facilities: T_Property_Facility[] }
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/facilities`,
    props
  )
}

function useUpdatePropertyFacilities(propertyId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: { facilities: T_Property_Facility[] }) =>
      updatePropertyFacilities(propertyId, props),
  })
  return query
}

export default useUpdatePropertyFacilities

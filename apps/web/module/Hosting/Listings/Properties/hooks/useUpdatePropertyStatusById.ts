import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Property_Status } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updatePropertyStatus(
  propertyId: string | undefined,
  props: T_Property_Status
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/status`,
    props
  )
}

function useUpdatePropertyStatusById(propertyId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Property_Status) =>
      updatePropertyStatus(propertyId, props),
  })
  return query
}

export default useUpdatePropertyStatusById

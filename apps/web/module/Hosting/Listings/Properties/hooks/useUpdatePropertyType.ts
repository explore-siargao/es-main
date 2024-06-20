import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

interface Props {
  type: string
}

export async function updatePropertyType(
  propertyId: string | undefined,
  props: Props
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/property-type`,
    props
  )
}

function useUpdatePropertyType(propertyId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: Props) => updatePropertyType(propertyId, props),
  })
  return query
}

export default useUpdatePropertyType

import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

interface Props {
  type: string
}

export async function updatePropertyType(
  propertyId: number | undefined,
  props: Props
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/property-type`,
    props
  )
}

function useUpdatePropertyType(propertyId: number | undefined) {
  const query = useMutation({
    mutationFn: (props: Props) => updatePropertyType(propertyId, props),
  })
  return query
}
export default useUpdatePropertyType

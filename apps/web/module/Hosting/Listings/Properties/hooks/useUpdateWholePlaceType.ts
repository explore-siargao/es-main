import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

interface Props {
  type: string
}

export async function updateWholePlaceType(
  propertyId: string | undefined,
  props: Props
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/whole-place-type`,
    props
  )
}

function useUpdateWholePlaceType(propertyId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: Props) => updateWholePlaceType(propertyId, props),
  })
  return query
}

export default useUpdateWholePlaceType

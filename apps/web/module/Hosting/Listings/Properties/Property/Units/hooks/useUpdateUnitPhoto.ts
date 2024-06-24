import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Photo } from "@repo/contract"

export async function updateUnitPhoto(propertyId: string, props: T_Photo) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/photo/${props._id}`,
    props
  )
}

function useUpdateUnitPhoto(propertyId: string) {
  const query = useMutation({
    mutationFn: (props: T_Photo) => updateUnitPhoto(propertyId, props),
  })
  return query
}
export default useUpdateUnitPhoto

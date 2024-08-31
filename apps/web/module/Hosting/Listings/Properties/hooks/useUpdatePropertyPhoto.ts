import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Photo } from "@repo/contract"

export async function updatePropertyPhoto(
  propertyId: string | undefined,
  props: T_Photo
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/photo/${props._id}`,
    props
  )
}

function useUpdatePropertyPhoto(propertyId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Photo) => updatePropertyPhoto(propertyId, props),
  })
  return query
}
export default useUpdatePropertyPhoto

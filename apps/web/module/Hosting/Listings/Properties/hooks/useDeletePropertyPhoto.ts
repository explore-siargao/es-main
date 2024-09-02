import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Photo } from "@repo/contract"

export async function deletePropertyPhoto(
  propertyId: string | undefined,
  props: T_Photo
) {
  const apiService = new ApiService()
  return await apiService.delete(
    `${API_URL_PROPERTIES}/${propertyId}/photo/${props._id}`,
    {}
  )
}

function useDeletePropertyPhoto(propertyId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Photo) => deletePropertyPhoto(propertyId, props),
  })
  return query
}
export default useDeletePropertyPhoto

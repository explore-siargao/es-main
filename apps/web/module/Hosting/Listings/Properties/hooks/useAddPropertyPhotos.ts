import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Photo } from "@repo/contract"

export async function addPropertyPhotos(
  propertyId: string | undefined,
  props: T_Photo
) {
  const formData = new FormData()
  formData.append("file", props.file as File)
  formData.append("isMain", String(props.isMain))
  formData.append("description", props.description)
  formData.append("tags", props.tags)
  const apiService = new ApiService("v2")
  return await apiService.post(
    `${API_URL_PROPERTIES}/${propertyId}/photo`,
    formData,
    true, // raw form data
    true // remove content type
  )
}

function useAddPropertyPhotos(propertyId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Photo) => addPropertyPhotos(propertyId, props),
  })
  return query
}
export default useAddPropertyPhotos

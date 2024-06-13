import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Photo } from "@repo/contract"

export async function addActivityPhoto(
  activityId: string | undefined,
  props: T_Photo
) {
  const formData = new FormData()
  formData.append("file", props.file as File)
  formData.append("isMain", String(props.isMain))
  formData.append("description", props.description)
  formData.append("tags", props.tags)
  const apiService = new ApiService("v2")
  return await apiService.post(
    `${API_URL_ACTIVITIES}/${activityId}/photo`,
    formData,
    true, // raw form data
    true // remove content type
  )
}

function useAddActivityPhoto(activityId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Photo) => addActivityPhoto(activityId, props),
  })
  return query
}
export default useAddActivityPhoto

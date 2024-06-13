import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Photo } from "@repo/contract"

export async function updateActivityPhoto(
  activityId: string | undefined,
  props: T_Photo
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_ACTIVITIES}/${activityId}/photo/${props._id}`,
    props
  )
}

function useUpdateActivityPhoto(activityId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Photo) => updateActivityPhoto(activityId, props),
  })
  return query
}
export default useUpdateActivityPhoto

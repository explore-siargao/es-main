import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Photo } from "@repo/contract"

export async function deleteActivityPhoto(
  activityId: string | undefined,
  props: T_Photo
) {
  const apiService = new ApiService("v2")
  return await apiService.delete(
    `${API_URL_ACTIVITIES}/${activityId}/photo/${props._id}`,
    {}
  )
}

function useDeleteActivityPhoto(activityId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Photo) => deleteActivityPhoto(activityId, props),
  })
  return query
}
export default useDeleteActivityPhoto

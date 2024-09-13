import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Update_Activity_Inclusions } from "@repo/contract"

export async function updateActivityInclusions(
  activityId: string | undefined,
  props: T_Update_Activity_Inclusions
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_ACTIVITIES}/${activityId}/inclusions`,
    props
  )
}

function useUpdateActivityInclusions(activityId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Activity_Inclusions) =>
      updateActivityInclusions(activityId, props),
  })
  return query
}
export default useUpdateActivityInclusions

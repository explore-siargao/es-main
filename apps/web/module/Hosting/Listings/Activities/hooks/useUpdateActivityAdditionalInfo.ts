import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Update_Activity_Additional_Info } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateActivityAdditionalInfo(
  activityId: string | undefined,
  props: T_Update_Activity_Additional_Info
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_ACTIVITIES}/${activityId}/additional-info`,
    props
  )
}

function useUpdateActivityAdditionalInfo(activityId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Activity_Additional_Info) =>
      updateActivityAdditionalInfo(activityId, props),
  })
  return query
}

export default useUpdateActivityAdditionalInfo

import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Update_Activity_Inclusions } from "@repo/contract"

export async function updateActivityInclusions(
  ActivityId: string | undefined,
  props: T_Update_Activity_Inclusions
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(`${API_URL_ACTIVITIES}/${ActivityId}/inclusions`, props)
}

function useUpdateActivityInclusions(ActivityId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Activity_Inclusions) =>
      updateActivityInclusions(ActivityId, props),
  })
  return query
}
export default useUpdateActivityInclusions

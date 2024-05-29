import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Update_Activity_Inclusions } from "@repo/contract"

export async function updateActivityInclusions(
  id: number | undefined,
  props: T_Update_Activity_Inclusions
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_ACTIVITIES}/${id}/inclusions`, props)
}

function useUpdateActivityInclusions(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Activity_Inclusions) =>
      updateActivityInclusions(id, props),
  })
  return query
}
export default useUpdateActivityInclusions

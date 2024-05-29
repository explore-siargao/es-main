import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Update_Activity_Basic_Info } from "@repo/contract"

export async function updateActivityBasicInfo(
  id: number | undefined,
  props: T_Update_Activity_Basic_Info
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_ACTIVITIES}/${id}/info`, props)
}

function useUpdateActivityBasicInfo(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Activity_Basic_Info) =>
      updateActivityBasicInfo(id, props),
  })
  return query
}
export default useUpdateActivityBasicInfo

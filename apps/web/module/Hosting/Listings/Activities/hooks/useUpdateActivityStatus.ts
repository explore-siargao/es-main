import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Activity_Status } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateActivityStatus(
  id: string | undefined,
  props: T_Activity_Status
) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_ACTIVITIES}/${id}/status`, props)
}

function useUpdateActivityStatus(id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Activity_Status) => updateActivityStatus(id, props),
  })
  return query
}

export default useUpdateActivityStatus

import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Activities } from "@repo/contract"

export async function updateInclussionsActivities(
  id: number | undefined,
  props: T_Activities
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_ACTIVITIES}/${id}/inclusions`, props)
}

function useUpdateInclussionsActivities(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Activities) => updateInclussionsActivities(id, props),
  })
  return query
}

export default useUpdateInclussionsActivities

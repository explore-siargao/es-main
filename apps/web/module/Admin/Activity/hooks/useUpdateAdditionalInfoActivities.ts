import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Activity } from "@repo/contract"

export async function updateAdditionalInfoActivities(
  id: string | undefined,
  props: T_Activity
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_ACTIVITIES}/${id}/additional-info`,
    props
  )
}

function useUpdateAdditionalInfoActivities(id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Activity) =>
      updateAdditionalInfoActivities(id, props),
  })
  return query
}

export default useUpdateAdditionalInfoActivities

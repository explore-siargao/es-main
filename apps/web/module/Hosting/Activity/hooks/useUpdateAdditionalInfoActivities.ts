import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Activities } from "@repo/contract"

export async function updateAdditionalInfoActivities(
  id: number | undefined,
  props: T_Activities
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(
    `${API_URL_ACTIVITIES}/${id}/additional-info`,
    props
  )
}

function useUpdateAdditionalInfoActivities(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Activities) =>
      updateAdditionalInfoActivities(id, props),
  })
  return query
}

export default useUpdateAdditionalInfoActivities

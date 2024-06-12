import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Activities } from "@repo/contract"

export async function updateBookableUnit(
  id: string | undefined,
  props: T_Activities
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(`${API_URL_ACTIVITIES}/${id}/info`, props)
}

function useUpdateActivitiesById(id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Activities) => updateBookableUnit(id, props),
  })
  return query
}
export default useUpdateActivitiesById

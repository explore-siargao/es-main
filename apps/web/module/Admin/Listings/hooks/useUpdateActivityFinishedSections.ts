import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

interface Section {
  finishedSections: string
}

export async function updateFinishedSections(
  activityId: string | undefined,
  props: Section
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_ACTIVITIES}/${activityId}/finished-sections`,
    props
  )
}

function useUpdateActivityFinishedSections(activityId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: Section) => updateFinishedSections(activityId, props),
  })
  return query
}
export default useUpdateActivityFinishedSections

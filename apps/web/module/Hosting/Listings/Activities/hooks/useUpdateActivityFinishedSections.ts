import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

type T_Finished_Sections = {
  newFinishedSection: string
}

export async function updateRentalFinishedSections(
  activityId: string | undefined,
  props: T_Finished_Sections
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_ACTIVITIES}/${activityId}/finished-sections`,
    props
  )
}

function useUpdateActivityFinishedSections(activityId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Finished_Sections) =>
      updateRentalFinishedSections(activityId, props),
  })
  return query
}

export default useUpdateActivityFinishedSections

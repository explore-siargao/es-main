import { API_URL_RENTALS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Activity_Segment, T_Location } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

type T_Activity_Itinerary = {
  meetingPoint: T_Location,
  isSegmentBuilderEnabled: boolean,
  segments: T_Activity_Segment[]
}

export async function updateActivityItinerary(
  id: string | undefined,
  props: T_Activity_Itinerary
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(`${API_URL_RENTALS}/${id}/itinerary`, props)
}

function useUpdateActivityItinerary(id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Activity_Itinerary) => updateActivityItinerary(id, props),
  })
  return query
}

export default useUpdateActivityItinerary

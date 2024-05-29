import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getAdditionalInfoByActivityId(
  activityId: number | undefined
) {
  const apiService = new ApiService("mock")
  return await apiService.get(
    `${API_URL_ACTIVITIES}/${activityId}/additional-info`
  )
}

function useGetAdditionalInfoByActivityId(activityId: number | undefined) {
  const query = useQuery({
    queryKey: ["get-activities-additional-info", activityId],
    queryFn: () => getAdditionalInfoByActivityId(activityId),
    refetchOnWindowFocus: false,
    enabled: !!activityId,
  })
  return query
}

export default useGetAdditionalInfoByActivityId

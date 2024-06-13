import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getActivityBasicInfo(activityId: string | undefined) {
  const apiService = new ApiService("v2")
  return await apiService.get(`${API_URL_ACTIVITIES}/${activityId}/info`)
}

function useGetActivityBasicInfo(activityId: string | undefined) {
  const query = useQuery({
    queryKey: ["get-activities-additional-info", activityId],
    queryFn: () => getActivityBasicInfo(activityId),
    refetchOnWindowFocus: false,
    enabled: !!activityId,
  })
  return query
}

export default useGetActivityBasicInfo

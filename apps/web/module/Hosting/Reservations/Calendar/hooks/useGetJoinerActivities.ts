import { API_URL_ACTIVITIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getCalendarJoinerActivities(startDate: string, endDate: string) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_ACTIVITIES}/calendar/activities?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetJoinerActivities(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: ["calendar-joiner-activities"],
    queryFn: () => getCalendarJoinerActivities(startDate, endDate),
  })
  return query
}

export default useGetJoinerActivities

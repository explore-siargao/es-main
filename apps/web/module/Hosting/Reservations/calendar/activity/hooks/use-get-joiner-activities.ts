import { API_URL_ACTIVITIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"
import { QK_CALENDAR_JOINER_ACTIVITIES } from "../constants"
import { T_BackendResponse, T_Calendar_Joiner_Activity } from "@repo/contract"

type T_DBReturn = Omit<T_BackendResponse, "items"> & {
  items: T_Calendar_Joiner_Activity[]
}

export async function getCalendarJoinerActivities(
  startDate: string,
  endDate: string
) {
  const apiService = new ApiService()
  return await apiService.get<T_DBReturn>(
    `${API_URL_ACTIVITIES}/calendar/joiner?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetJoinerActivities(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: [QK_CALENDAR_JOINER_ACTIVITIES],
    queryFn: () => getCalendarJoinerActivities(startDate, endDate),
    refetchOnWindowFocus: false,
  })
  return query
}

export default useGetJoinerActivities

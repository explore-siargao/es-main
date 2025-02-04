import { API_URL_ACTIVITIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"
import { QK_CALENDAR_PRIVATE_ACTIVITIES } from "../constants"
import { T_Calendar_Private_Activity, T_BackendResponse } from "@repo/contract"

type T_DBReturn = Omit<T_BackendResponse, "items"> & {
  items: T_Calendar_Private_Activity[]
}

export async function getCalendarPrivateActivities(
  startDate: string,
  endDate: string
) {
  const apiService = new ApiService()
  return await apiService.get<T_DBReturn>(
    `${API_URL_ACTIVITIES}/calendar/private?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetPrivateActivities(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: [QK_CALENDAR_PRIVATE_ACTIVITIES],
    queryFn: () => getCalendarPrivateActivities(startDate, endDate),
    refetchOnWindowFocus: false,
  })
  return query
}

export default useGetPrivateActivities

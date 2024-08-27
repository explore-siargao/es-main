import { API_URL_PROPERTIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getRoomCalendar(startDate: string, endDate: string) {
  const apiService = new ApiService("v2")
  return await apiService.get(
    `${API_URL_PROPERTIES}/calendar/room?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetCalendarRoom(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: ["calendar-room"],
    queryFn: () => getRoomCalendar(startDate, endDate),
  })
  return query
}

export default useGetCalendarRoom

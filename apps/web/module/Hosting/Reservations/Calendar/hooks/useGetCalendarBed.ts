import { API_URL_PROPERTIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getBedCalendar(startDate: string, endDate: string) {
  const apiService = new ApiService("v2")
  return await apiService.get(
    `${API_URL_PROPERTIES}/calendar/bed?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetCalendarBed(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: ["calendar-bed"],
    queryFn: () => getBedCalendar(startDate, endDate),
  })
  return query
}

export default useGetCalendarBed

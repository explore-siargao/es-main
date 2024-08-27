import { API_URL_RENTALS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getBikeCalendar(startDate: string, endDate: string) {
  const apiService = new ApiService("v2")
  return await apiService.get(
    `${API_URL_RENTALS}/calendar/bike?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetCalendarBike(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: ["calendar-bike"],
    queryFn: () => getBikeCalendar(startDate, endDate),
  })
  return query
}

export default useGetCalendarBike

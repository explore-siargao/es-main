import { API_URL_RENTALS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getCarCalendar(startDate: string, endDate: string) {
  const apiService = new ApiService("v2")
  return await apiService.get(
    `${API_URL_RENTALS}/calendar/car?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetCalendarCar(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: ["calendar-car"],
    queryFn: () => getCarCalendar(startDate, endDate),
  })
  return query
}

export default useGetCalendarCar

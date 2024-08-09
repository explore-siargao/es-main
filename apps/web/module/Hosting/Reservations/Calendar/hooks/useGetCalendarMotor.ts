import { API_URL_RENTALS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getMotorCalendar(startDate:string, endDate:string) {
  const apiService = new ApiService("v2")
  return await apiService.get(`${API_URL_RENTALS}/calendar/motor?startDate=${startDate}&endDate=${endDate}`)
}

function useGetCalendarMotor(startDate:string,endDate:string) {
  const query = useQuery({
    queryKey: ["listings"],
    queryFn: () => getMotorCalendar(startDate,endDate),
  })
  return query
}

export default useGetCalendarMotor

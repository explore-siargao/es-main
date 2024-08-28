import { API_URL_PROPERTIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getCalendarProperty(
  startDate: string,
  endDate: string
) {
  const apiService = new ApiService("v2")
  return await apiService.get(
    `${API_URL_PROPERTIES}/calendar/property?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetCalendarProperty(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: ["calendar-property"],
    queryFn: () => getCalendarProperty(startDate, endDate),
  })
  return query
}

export default useGetCalendarProperty

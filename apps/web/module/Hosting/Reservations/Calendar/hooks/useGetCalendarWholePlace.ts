import { API_URL_PROPERTIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getCalendarWholePlace(startDate: string, endDate: string) {
  const apiService = new ApiService("v2")
  return await apiService.get(
    `${API_URL_PROPERTIES}/calendar/whole-place?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetCalendarWholePlace(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: ["calendar-whole-place"],
    queryFn: () => getCalendarWholePlace(startDate, endDate),
  })
  return query
}

export default useGetCalendarWholePlace

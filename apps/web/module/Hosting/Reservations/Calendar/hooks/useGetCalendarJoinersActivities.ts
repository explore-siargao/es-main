import { API_URL_ACTIVITIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getJoinerActivityCalendar(
  startDate: string,
  endDate: string
) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_ACTIVITIES}/calendar/joiner?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetJoinerActivityCalendar(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: ["calendar-joiner-activity"],
    queryFn: () => getJoinerActivityCalendar(startDate, endDate),
  })
  return query
}

export default useGetJoinerActivityCalendar

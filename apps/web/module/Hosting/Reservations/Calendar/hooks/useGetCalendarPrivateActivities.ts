import { API_URL_ACTIVITIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getPrivateActivityCalendar(
  startDate: string,
  endDate: string
) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_ACTIVITIES}/calendar/private?startDate=${startDate}&endDate=${endDate}`
  )
}

function useGetPrivateActivityCalendar(startDate: string, endDate: string) {
  const query = useQuery({
    queryKey: ["calendar-private-activity"],
    queryFn: () => getPrivateActivityCalendar(startDate, endDate),
  })
  return query
}

export default useGetPrivateActivityCalendar

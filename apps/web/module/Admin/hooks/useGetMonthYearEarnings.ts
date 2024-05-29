import { ApiService } from "@/common/service/api"
import { API_URL_BOOKINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

const apiService = new ApiService("mock")
export async function getMonthYearEarnings(monthYear: string) {
  return await apiService.get(`${API_URL_BOOKINGS}/earnings/${monthYear}`)
}

function useGetMonthYearEarnings(monthYear: string) {
  const query = useQuery({
    queryKey: ["month-year-earnings"],
    queryFn: () => getMonthYearEarnings(monthYear),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetMonthYearEarnings

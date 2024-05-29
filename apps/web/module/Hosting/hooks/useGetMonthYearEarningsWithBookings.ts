import { ApiService } from "@/common/service/api"
import { API_URL_BOOKINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

const apiService = new ApiService("mock")
export async function getMonthYearEarnings(monthYear: string) {
  return await apiService.get(
    `${API_URL_BOOKINGS}/earnings/${monthYear}/bookings`
  )
}

function useGetMonthYearEarningsWithBookings(monthYear: string) {
  const query = useQuery({
    queryKey: ["month-year-earnings-bookings"],
    queryFn: () => getMonthYearEarnings(monthYear),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetMonthYearEarningsWithBookings

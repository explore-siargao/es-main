import { ApiService } from "@/common/service/api"
import { API_URL_BOOKINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getThisMonthEarnings() {
  const apiService = new ApiService("mock")
  return await apiService.get(
    `${API_URL_BOOKINGS}/earnings/this-month/bookings`
  )
}

function useGetThisMonthEarningsWithBookings() {
  const query = useQuery({
    queryKey: ["this-month-earnings-bookings"],
    queryFn: () => getThisMonthEarnings(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetThisMonthEarningsWithBookings

import { API_URL_BOOKINGS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getBookings(page: number) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_BOOKINGS}/paginated?page=${page}`)
}

function useGetBookings(page: number) {
  const query = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => getBookings(page),
  })
  return query
}

export default useGetBookings

import {
  FIFTEEN_MINUTES,
  TWELVE_MINUTES,
  API_URL_LISTINGS,
} from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getAllBookings() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}`)
}

function useGetAllBookings() {
  const query = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getAllBookings(),
    refetchOnWindowFocus: false,
    gcTime: FIFTEEN_MINUTES,
    staleTime: TWELVE_MINUTES,
  })
  return query
}
export default useGetAllBookings

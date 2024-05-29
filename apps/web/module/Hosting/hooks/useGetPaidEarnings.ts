import { ApiService } from "@/common/service/api"
import { API_URL_BOOKINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getPaidEarnings() {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_BOOKINGS}/earnings/paid`)
}

function useGetPaidEarnings() {
  const query = useQuery({
    queryKey: ["paid-earnings"],
    queryFn: () => getPaidEarnings(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetPaidEarnings

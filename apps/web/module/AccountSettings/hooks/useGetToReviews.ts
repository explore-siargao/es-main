import { ApiService } from "@/common/service/api"
import { API_URL_BOOKINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getToReviews() {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_BOOKINGS}/to-review`)
}

function useGetToReviews() {
  const query = useQuery({
    queryKey: ["to-reviews"],
    queryFn: () => getToReviews(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetToReviews

import { ApiService } from "@/common/service/api"
import { API_URL_BOOKINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getToReviewById(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_BOOKINGS}/to-review/${id}`)
}

function useGetToReviewById(id: number | undefined) {
  const query = useQuery({
    queryKey: ["to-review", id],
    queryFn: () => getToReviewById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetToReviewById

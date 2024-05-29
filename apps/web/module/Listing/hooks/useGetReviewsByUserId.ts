import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReviewByUserId(userId: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/reviews/user/${userId}`)
}

function useGetReviewsByUserId(userId: number | undefined) {
  const query = useQuery({
    queryKey: ["review", userId],
    queryFn: () => getReviewByUserId(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  })
  return query
}
export default useGetReviewsByUserId

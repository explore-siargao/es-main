import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReviewById(reviewId: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/reviews/view/${reviewId}`)
}

function useGetReviewById(reviewId: number | undefined) {
  const query = useQuery({
    queryKey: ["review", reviewId],
    queryFn: () => getReviewById(reviewId),
    refetchOnWindowFocus: false,
    enabled: !!reviewId,
  })
  return query
}
export default useGetReviewById

import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_Review } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function addReview(userId: number | undefined, props: T_Review) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_LISTINGS}/${userId}/reviews/post`,
    props
  )
}

function useAddReview(userId: number) {
  const query = useMutation({
    mutationFn: (props: T_Review) => addReview(userId, props),
  })
  return query
}
export default useAddReview

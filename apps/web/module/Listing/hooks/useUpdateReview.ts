import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_Review } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateReview(userId: number | null, props: T_Review) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/reviews/update/${props.id}`,
    props
  )
}

function useUpdateReview(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: T_Review) => updateReview(userId, props),
  })
  return query
}
export default useUpdateReview

import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_CancellationPolicy } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateCancellationPolicy(
  userId: number | null,
  props: T_CancellationPolicy
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/cancellation-policies/${props.id}`,
    props
  )
}

function useUpdateCancellationPolicy(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: T_CancellationPolicy) =>
      updateCancellationPolicy(userId, props),
  })
  return query
}
export default useUpdateCancellationPolicy

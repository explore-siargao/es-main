import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_Rule } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function addCancellationPolicyRule(
  userId: number | undefined,
  props: T_Rule
) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_LISTINGS}/${userId}/rules/cancellation-policy`,
    props
  )
}

function useAddCancellationPolicyRule(userId: number) {
  const query = useMutation({
    mutationFn: (props: T_Rule) => addCancellationPolicyRule(userId, props),
  })
  return query
}
export default useAddCancellationPolicyRule

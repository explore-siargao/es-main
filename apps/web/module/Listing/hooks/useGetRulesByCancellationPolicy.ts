import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getRulesByCancellationPolicyId(
  cancellationPolicyId: number | undefined
) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_LISTINGS}/rules/cancellation-policy/${cancellationPolicyId}`
  )
}

function useGetRulesByCancellationPolicy(
  cancellationPolicyId: number | undefined
) {
  const query = useQuery({
    queryKey: ["rules", cancellationPolicyId],
    queryFn: () => getRulesByCancellationPolicyId(cancellationPolicyId),
    refetchOnWindowFocus: false,
    enabled: !!cancellationPolicyId,
  })
  return query
}
export default useGetRulesByCancellationPolicy

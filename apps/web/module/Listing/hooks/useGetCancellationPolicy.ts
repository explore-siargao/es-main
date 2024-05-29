import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getCancellationPolicyById(id: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_LISTINGS}/cancellation-policies/id/${id}`
  )
}

function useGetCancellationPolicy(id: number | undefined) {
  const query = useQuery({
    queryKey: ["cancellation-policies", id],
    queryFn: () => getCancellationPolicyById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetCancellationPolicy

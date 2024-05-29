import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getAllCancellationPolicies() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/all/cancellation-policies`)
}

function useGetAllCancellationPolicies() {
  const query = useQuery({
    queryKey: ["cancellation-policies"],
    queryFn: () => getAllCancellationPolicies(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetAllCancellationPolicies

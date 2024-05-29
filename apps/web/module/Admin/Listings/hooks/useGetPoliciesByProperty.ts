import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getPolicies(propertyId: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_PROPERTIES}/${propertyId}/policies`)
}

function useGetPoliciesByProperty(propertyId: number | undefined) {
  const query = useQuery({
    queryKey: ["policies", propertyId],
    queryFn: () => getPolicies(propertyId),
    refetchOnWindowFocus: false,
    enabled: !!propertyId,
  })
  return query
}
export default useGetPoliciesByProperty

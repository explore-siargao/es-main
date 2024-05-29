import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getSafetyPropertyById(id: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/safety-properties/id/${id}`)
}

function useGetSafetyProperty(id: number | undefined) {
  const query = useQuery({
    queryKey: ["safety-properties", id],
    queryFn: () => getSafetyPropertyById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetSafetyProperty

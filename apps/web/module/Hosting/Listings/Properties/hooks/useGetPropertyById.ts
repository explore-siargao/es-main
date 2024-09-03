import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getPropertyById(propertyId: string | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_PROPERTIES}/${propertyId}`)
}

function useGetPropertyById(propertyId: string | undefined) {
  const query = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => getPropertyById(propertyId),
    enabled: !!propertyId,
  })
  return query
}
export default useGetPropertyById

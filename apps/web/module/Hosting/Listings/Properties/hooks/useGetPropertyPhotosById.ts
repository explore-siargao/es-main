import { API_URL_PROPERTIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getPropertyPhotosById(propertyId: string | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_PROPERTIES}/${propertyId}/photos`)
}

function useGetPropertyPhotosById(propertyId: string | undefined) {
  const query = useQuery({
    queryKey: ["property-photos"],
    queryFn: () => getPropertyPhotosById(propertyId),
    refetchOnWindowFocus: false,
    enabled: !!propertyId,
  })
  return query
}

export default useGetPropertyPhotosById

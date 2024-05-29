import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getAmenitiesByPropertyId(propertyId: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(
    `${API_URL_PROPERTIES}/${propertyId}/amenities-property`
  )
}

function useGetAmenitiesByPropertyId(propertyId: number | undefined) {
  const query = useQuery({
    queryKey: ["amenities-property", propertyId],
    queryFn: () => getAmenitiesByPropertyId(propertyId),
    refetchOnWindowFocus: false,
    enabled: !!propertyId,
  })
  return query
}

export default useGetAmenitiesByPropertyId

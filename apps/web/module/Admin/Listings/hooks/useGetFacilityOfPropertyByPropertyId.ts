import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getFacilityOfPropertyByPropertyId(
  propertyId: number | undefined
) {
  const apiService = new ApiService("mock")
  return await apiService.get(
    `${API_URL_PROPERTIES}/${propertyId}/facility-property`
  )
}

function useGetFacilityOfPropertyByPropertyId(propertyId: number | undefined) {
  const query = useQuery({
    queryKey: ["facility-property", propertyId],
    queryFn: () => getFacilityOfPropertyByPropertyId(propertyId),
    refetchOnWindowFocus: false,
    enabled: !!propertyId,
  })
  return query
}
export default useGetFacilityOfPropertyByPropertyId

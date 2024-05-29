import { ApiService } from "@/common/service/api"
import { API_URL_BOOKABLE_UNIT } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getPropertyById(
  propertyId: number,
  page?: number | undefined
) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_BOOKABLE_UNIT}/${propertyId}`)
}

function useGetPaginatedBookableUnitTypes(
  propertyId: number,
  page?: number | undefined
) {
  const query = useQuery({
    queryKey: ["bookable-unit-types", propertyId, page],
    queryFn: () => getPropertyById(propertyId),
    enabled: !!propertyId,
  })
  return query
}
export default useGetPaginatedBookableUnitTypes

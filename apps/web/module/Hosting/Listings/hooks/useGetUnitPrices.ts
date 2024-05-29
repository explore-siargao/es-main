import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getUnitPrices(
  propertyId: number | undefined,
  unitId: number | undefined
) {
  const apiService = new ApiService("mock")
  return await apiService.get(
    `${API_URL_PROPERTIES}/${propertyId}/units/${unitId}/price`
  )
}

function useGetUnitPrices(
  propertyId: number | undefined,
  unitId: number | undefined
) {
  const query = useQuery({
    queryKey: ["unit-prices", unitId],
    queryFn: () => getUnitPrices(propertyId, unitId),
    refetchOnWindowFocus: false,
    enabled: !!unitId,
  })
  return query
}
export default useGetUnitPrices

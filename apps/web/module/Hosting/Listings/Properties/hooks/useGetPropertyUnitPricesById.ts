import { API_URL_PROPERTIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getPropertyUnitPricesById(propertyId: string | undefined) {
  const apiService = new ApiService("v2")
  return await apiService.get(`${API_URL_PROPERTIES}/${propertyId}/units/pricing/list`)
}

function useGetPropertyUnitPricesById(propertyId: string | undefined) {
  const query = useQuery({
    queryKey: ["property-unit-pricing"],
    queryFn: () => getPropertyUnitPricesById(propertyId),
    refetchOnWindowFocus: false,
    enabled: !!propertyId,
  })
  return query
}

export default useGetPropertyUnitPricesById

import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getAmenitiesByBookableUnitTypeId(
  bookableUnitTypeId: number | undefined
) {
  const apiService = new ApiService("mock")
  return await apiService.get(
    `${API_URL_PROPERTIES}/${bookableUnitTypeId}/amenities-bookableUnitType`
  )
}

function useGetAmenitiesByBookableUnitTypeId(
  bookableUnitTypeId: number | undefined
) {
  const query = useQuery({
    queryKey: ["amenities-bookableUnitType", bookableUnitTypeId],
    queryFn: () => getAmenitiesByBookableUnitTypeId(bookableUnitTypeId),
    refetchOnWindowFocus: false,
    enabled: !!bookableUnitTypeId,
  })
  return query
}

export default useGetAmenitiesByBookableUnitTypeId

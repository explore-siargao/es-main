import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getFacilityOfBookableUnitType(
  bookableUnitTypeId: number | undefined
) {
  const apiService = new ApiService("mock")
  return await apiService.get(
    `${API_URL_PROPERTIES}/${bookableUnitTypeId}/facility-unit-type`
  )
}

function useGetFacilityOfBookableUnitType(
  bookableUnitTypeId: number | undefined
) {
  const query = useQuery({
    queryKey: ["facility-unit-type", bookableUnitTypeId],
    queryFn: () => getFacilityOfBookableUnitType(bookableUnitTypeId),
    refetchOnWindowFocus: false,
    enabled: !!bookableUnitTypeId,
  })
  return query
}
export default useGetFacilityOfBookableUnitType

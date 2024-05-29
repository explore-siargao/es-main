import { ApiService } from "@/common/service/api"
import { API_URL_BOOKABLE_UNIT } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getByBookableUnitType(
  bookableUnitTypeId: number | undefined
) {
  const apiService = new ApiService("mock")
  return await apiService.get(
    `${API_URL_BOOKABLE_UNIT}/bookable-unit-type/${bookableUnitTypeId}`
  )
}

function useGetByBookableUnitType(bookableUnitTypeId: number | undefined) {
  const query = useQuery({
    queryKey: ["bookable-unit", bookableUnitTypeId],
    queryFn: () => getByBookableUnitType(bookableUnitTypeId),
    refetchOnWindowFocus: false,
    enabled: !!bookableUnitTypeId,
  })
  return query
}
export default useGetByBookableUnitType

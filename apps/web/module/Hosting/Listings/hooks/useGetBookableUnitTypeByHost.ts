import { ApiService } from "@/common/service/api"
import { API_URL_BOOKABLE_UNIT_TYPE } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getBookableUnitTypeByHost(hostId: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_BOOKABLE_UNIT_TYPE}/host/${hostId}`)
}

function useGetBookableUnitTypeByHost(hostId: number | undefined) {
  const query = useQuery({
    queryKey: ["bookable-unit-type", hostId],
    queryFn: () => getBookableUnitTypeByHost(hostId),
    refetchOnWindowFocus: false,
    enabled: !!hostId,
  })
  return query
}
export default useGetBookableUnitTypeByHost

import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getUnitById(unitId: string | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_PROPERTIES}/unit/${unitId}`)
}

function useGetUnitById(unitId: string | undefined) {
  const query = useQuery({
    queryKey: ["unit", unitId],
    queryFn: () => getUnitById(unitId),
    enabled: !!unitId,
  })
  return query
}
export default useGetUnitById

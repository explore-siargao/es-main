import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getUnitById(id: string | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_PROPERTIES}/units/${id}`)
}

function useGetUnitById(id: string) {
  const query = useQuery({
    queryKey: ["unit", id],
    queryFn: () => getUnitById(id),
    enabled: !!id,
  })
  return query
}
export default useGetUnitById

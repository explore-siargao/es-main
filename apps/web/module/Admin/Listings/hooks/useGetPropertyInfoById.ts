import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getPropertyInfoById(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_PROPERTIES}/${id}/info`)
}

function useGetPropertyInfoById(id: number | undefined) {
  const query = useQuery({
    queryKey: ["properties-info", id],
    queryFn: () => getPropertyInfoById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetPropertyInfoById

import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getPropertyById(id: string | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_PROPERTIES}/${id}`)
}

function useGetPropertyById(id: string | undefined) {
  const query = useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
  })
  return query
}
export default useGetPropertyById

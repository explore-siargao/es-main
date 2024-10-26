import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"
//TODO: this is a placeholder hook, replace the  query with the actual one once its available

export async function getPropertyListings(id: string | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_PROPERTIES}/${id}`)
}

function useGetPropertyListings(id: string | undefined) {
  const query = useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyListings(id),
    enabled: !!id,
  })
  return query
}
export default useGetPropertyListings

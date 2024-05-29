import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getHighlightById(id: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/highlights/${id}`)
}

function useGetHighlight(id: number | undefined) {
  const query = useQuery({
    queryKey: ["highlights", id],
    queryFn: () => getHighlightById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetHighlight

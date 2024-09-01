import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getActivityById(id: string | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_ACTIVITIES}/${id}`)
}

function useGetActivityById(id: string | undefined) {
  const query = useQuery({
    queryKey: ["activity", id],
    queryFn: () => getActivityById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}

export default useGetActivityById

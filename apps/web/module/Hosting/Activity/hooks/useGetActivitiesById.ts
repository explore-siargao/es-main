import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getActivitiesById(id: string) {
  const apiService = new ApiService("v2")
  return await apiService.get(`${API_URL_ACTIVITIES}/${id}`)
}

function useGetActivitiesById(id: string) {
  const query = useQuery({
    queryKey: ["activity-basic-info", id],
    queryFn: () => getActivitiesById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}

export default useGetActivitiesById

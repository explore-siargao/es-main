import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getAdditionalInfoActivities(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_ACTIVITIES}/${id}/additional-info`)
}

function useGetAdditionalInfoActivities(id: number | undefined) {
  const query = useQuery({
    queryKey: ["additional-info", id],
    queryFn: () => getAdditionalInfoActivities(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}

export default useGetAdditionalInfoActivities

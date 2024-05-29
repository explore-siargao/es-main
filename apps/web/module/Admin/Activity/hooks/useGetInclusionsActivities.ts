import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getInclusionsActivities(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_ACTIVITIES}/${id}/inclusions`)
}

function useGetInclusionsActivities(id: number | undefined) {
  const query = useQuery({
    queryKey: ["activities-inclusion", id],
    queryFn: () => getInclusionsActivities(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}

export default useGetInclusionsActivities

import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getActivitiesById(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_ACTIVITIES}/${id}/inclusions`)
}

function useGetActivityInclusionsById(id: number | undefined) {
  const query = useQuery({
    queryKey: ["get-activities-inclusions", id],
    queryFn: () => getActivitiesById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}

export default useGetActivityInclusionsById

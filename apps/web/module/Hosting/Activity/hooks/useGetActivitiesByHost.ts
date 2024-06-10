import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getActivitiesByHost() {
  const apiService = new ApiService("v2")
  return await apiService.get(`${API_URL_ACTIVITIES}/host`)
}

function useActivitiesByHost() {
  const query = useQuery({
    queryKey: ["activity-host"],
    queryFn: () => getActivitiesByHost(),
    refetchOnWindowFocus: false
  })
  return query
}

export default useActivitiesByHost

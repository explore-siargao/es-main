import { API_URL_ACTIVITIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getActivitiesByHost() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_ACTIVITIES}/host`)
}

function useGetHostActivities() {
  const query = useQuery({
    queryKey: ["host-activities"],
    queryFn: () => getActivitiesByHost(),
    refetchOnWindowFocus: false,
  })
  return query
}

export default useGetHostActivities

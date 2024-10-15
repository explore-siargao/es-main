import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getActivityByHost(type?: string) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_ACTIVITIES}/host?type=${type}`)
}

function useGetActivityByHost(type?: string) {
  const query = useQuery({
    queryKey: ["activities"],
    queryFn: () => getActivityByHost(type),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetActivityByHost

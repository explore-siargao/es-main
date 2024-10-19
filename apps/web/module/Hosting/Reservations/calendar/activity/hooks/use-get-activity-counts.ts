import { API_URL_ACTIVITIES } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { T_BackendResponse } from "@repo/contract"
import { useQuery } from "@tanstack/react-query"

type T_DBReturn = Omit<T_BackendResponse, "items"> & {
  item: {
    joiner: number
    private: number
  }
}

export async function getActivitiesCounts() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_ACTIVITIES}/counts/all`)
}

function useGetActivityCounts() {
  const query = useQuery({
    queryKey: ["activity-counts"],
    queryFn: () => getActivitiesCounts(),
  })
  return query
}

export default useGetActivityCounts

import {
  API_URL_ACTIVITIES,
  API_URL_RENTALS,
} from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getRentalCounts() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_ACTIVITIES}/counts/all`)
}

function useGetActivityCounts() {
  const query = useQuery({
    queryKey: ["activity-counts"],
    queryFn: () => getRentalCounts(),
  })
  return query
}

export default useGetActivityCounts
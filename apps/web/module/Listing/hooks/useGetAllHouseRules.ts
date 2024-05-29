import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getAllHouseRules() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/all/house-rules`)
}

function useGetAllHouseRules() {
  const query = useQuery({
    queryKey: ["house-rules"],
    queryFn: () => getAllHouseRules(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetAllHouseRules

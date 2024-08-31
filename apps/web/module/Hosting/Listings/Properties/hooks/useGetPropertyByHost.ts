import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getPropertyByHost() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_PROPERTIES}/`)
}

function useGetPropertyByHost() {
  const query = useQuery({
    queryKey: ["properties"],
    queryFn: () => getPropertyByHost(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetPropertyByHost

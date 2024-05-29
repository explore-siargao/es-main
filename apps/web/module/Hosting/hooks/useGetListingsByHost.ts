import { API_URL_LISTINGS } from "@/common/constants/api-routes"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getListings() {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_LISTINGS}/hosted`)
}

function useGetListingsByHost() {
  const query = useQuery({
    queryKey: ["listings"],
    queryFn: () => getListings(),
  })
  return query
}

export default useGetListingsByHost

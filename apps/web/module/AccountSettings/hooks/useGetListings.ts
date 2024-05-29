import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getListings() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}`)
}

function useGetListings() {
  const query = useQuery({
    queryKey: ["listings"],
    queryFn: () => getListings(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetListings

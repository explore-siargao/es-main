import { API_URL_CARTS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getCartItemByHost() {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_CARTS}/host`)
}

function useGetCartItemByHost() {
  const query = useQuery({
    queryKey: ["carts-host"],
    queryFn: () => getCartItemByHost(),
    refetchOnWindowFocus: false,
  })
  return query
}

export default useGetCartItemByHost

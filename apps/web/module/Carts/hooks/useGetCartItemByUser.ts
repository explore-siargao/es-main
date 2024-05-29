import { API_URL_CARTS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

export async function getCartItemByUser() {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_CARTS}/user`)
}

function useGetCartItemByUser() {
  const query = useQuery({
    queryKey: ["carts-user"],
    queryFn: () => getCartItemByUser(),
    refetchOnWindowFocus: false,
  })
  return query
}

export default useGetCartItemByUser

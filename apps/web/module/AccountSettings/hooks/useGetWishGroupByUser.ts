import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getWishGroupByuser(userId: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/${userId}/wish-group`)
}

function useGetWishGroupByUser(userId: number | undefined) {
  const query = useQuery({
    queryKey: ["wish-group", userId],
    queryFn: () => getWishGroupByuser(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  })
  return query
}
export default useGetWishGroupByUser

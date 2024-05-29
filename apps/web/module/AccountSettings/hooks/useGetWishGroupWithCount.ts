import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getWishGroup(userId: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/${userId}/group/wish`)
}

function useWishGroupWithCount(userId: number | undefined) {
  const query = useQuery({
    queryKey: ["wish-group-count", userId],
    queryFn: () => getWishGroup(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  })
  return query
}
export default useWishGroupWithCount

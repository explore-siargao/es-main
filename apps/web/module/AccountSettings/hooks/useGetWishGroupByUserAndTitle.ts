import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getWishGroupByTitle(
  userId: number | undefined,
  title: string
) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/${userId}/${title}/wishes`)
}

function useGetWishGroupByUserAndTitle(
  userId: number | undefined,
  title: string
) {
  const query = useQuery({
    queryKey: ["wish-group", userId],
    queryFn: () => getWishGroupByTitle(userId, title),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  })
  return query
}
export default useGetWishGroupByUserAndTitle

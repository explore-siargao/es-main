import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReservationsByUserId(userId: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_LISTINGS}/reservation-listing/user/${userId}`
  )
}

function useGetReservationsByUser(userId: number | undefined) {
  const query = useQuery({
    queryKey: ["reservation-listing", userId],
    queryFn: () => getReservationsByUserId(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  })
  return query
}
export default useGetReservationsByUser

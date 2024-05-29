import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getNotificationsByHostId(hostId: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/notifications/${hostId}`)
}

function useGetNotifications(id: number | undefined) {
  const query = useQuery({
    queryKey: ["notifications", id],
    queryFn: () => getNotificationsByHostId(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetNotifications

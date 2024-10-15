import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getActivitySlots(id: string, date: string) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_ACTIVITIES}/${id}/null/${date}`)
}

function useGetPrivateActivitySlots(id: any, date: any) {
  const query = useQuery({
    queryKey: ["private-activity-slots"],
    queryFn: () => getActivitySlots(id, date),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetPrivateActivitySlots

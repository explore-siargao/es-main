import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getActivitySlots(id: string, slotId: any, date: string) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_ACTIVITIES}/${id}/${slotId}/${date}`)
}

function useGetJoinerActivitySlots(id: any, slotId: any, date: any) {
  const query = useQuery({
    queryKey: ["joiner-activity-slots"],
    queryFn: () => getActivitySlots(id, slotId, date),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetJoinerActivitySlots

import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getPropertyByGuestId(guestId: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_PROPERTIES}/guest/${guestId}`)
}

function useGetPropertyByGuestId(guestId: number | undefined) {
  const query = useQuery({
    queryKey: ["properties", guestId],
    queryFn: () => getPropertyByGuestId(guestId),
    refetchOnWindowFocus: false,
    enabled: !!guestId,
  })
  return query
}
export default useGetPropertyByGuestId

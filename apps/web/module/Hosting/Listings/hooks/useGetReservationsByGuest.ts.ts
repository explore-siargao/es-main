import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReservationByGuestId(guestId: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_RESERVATIONS}/guest/${guestId}`)
}

function useGetReservationsByGuest(guestId: number | undefined) {
  const query = useQuery({
    queryKey: ["reservations", guestId],
    queryFn: () => getReservationByGuestId(guestId),
    refetchOnWindowFocus: false,
    enabled: !!guestId,
  })
  return query
}
export default useGetReservationsByGuest

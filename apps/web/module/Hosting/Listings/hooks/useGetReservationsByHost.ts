import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReservationByHostId() {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_RESERVATIONS}/host`)
}

function useGetReservationsByHostId() {
  const query = useQuery({
    queryKey: ["properties"],
    queryFn: () => getReservationByHostId(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetReservationsByHostId

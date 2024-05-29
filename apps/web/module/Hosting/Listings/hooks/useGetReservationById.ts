import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReservation(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_RESERVATIONS}/${id}`)
}

function useGetReservationById(id: number | undefined) {
  const query = useQuery({
    queryKey: ["reservation", id],
    queryFn: () => getReservation(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetReservationById

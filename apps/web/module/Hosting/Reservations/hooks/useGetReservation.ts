import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReservation(_id: string) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_RESERVATIONS}/${_id}`)
}

function useGetReservation(_id: string) {
  const query = useQuery({
    queryKey: ["reservation", _id],
    queryFn: () => getReservation(_id),
    refetchOnWindowFocus: false,
    enabled: !!_id,
  })
  return query
}

export default useGetReservation

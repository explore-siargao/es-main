import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type T_UnitReservation = {
  startDate: string
  endDate: string
  id: string
}

export async function updateActivityReservation(
  props: T_UnitReservation,
  id: string
) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_RESERVATIONS}/${id}/unit`, props)
}

function useUpdateActivityReservation(id: string) {
  const query = useMutation({
    mutationFn: (props: T_UnitReservation) =>
      updateActivityReservation(props, id),
  })
  return query
}
export default useUpdateActivityReservation

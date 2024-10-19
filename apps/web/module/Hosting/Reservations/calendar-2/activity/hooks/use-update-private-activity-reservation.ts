import { ApiService } from "@/common/service/api"
import { API_URL_RESERVATIONS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type T_PrivateActivityReservation = {
  notes?: string
  id: string
}

export async function updatePrivateActivityReservation(
  props: T_PrivateActivityReservation,
  id: string
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_RESERVATIONS}/${id}/private-activity`,
    props
  )
}

function useUpdatePrivateActivityReservation(id: string) {
  const query = useMutation({
    mutationFn: (props: T_PrivateActivityReservation) =>
      updatePrivateActivityReservation(props, id),
  })
  return query
}
export default useUpdatePrivateActivityReservation

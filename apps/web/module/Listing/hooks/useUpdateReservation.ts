import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_ReservationListing } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateReservation(
  userId: number | null | undefined,
  props: T_ReservationListing
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/reservation-listing/${props.id}`,
    props
  )
}

function useUpdateReservation(userId: number | null | undefined) {
  const query = useMutation({
    mutationFn: (props: T_ReservationListing) =>
      updateReservation(userId, props),
  })
  return query
}
export default useUpdateReservation

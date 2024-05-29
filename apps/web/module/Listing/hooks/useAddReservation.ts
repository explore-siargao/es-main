import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_ReservationListing } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function addReservation(
  userId: number | undefined,
  props: T_ReservationListing
) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_LISTINGS}/${userId}/reservation-listing`,
    props
  )
}

function useAddReservation(userId: number) {
  const query = useMutation({
    mutationFn: (props: T_ReservationListing) => addReservation(userId, props),
  })
  return query
}
export default useAddReservation

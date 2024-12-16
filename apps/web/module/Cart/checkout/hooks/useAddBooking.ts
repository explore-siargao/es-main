import { ApiService } from "@/common/service/api"
import { API_URL_BOOKINGS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_AddBooking } from "@repo/contract"

export async function addAddress(props: T_AddBooking) {
  const apiService = new ApiService()
  return await apiService.post(`${API_URL_BOOKINGS}`, props)
}

function useAddBooking() {
  const query = useMutation({
    mutationFn: (props: T_AddBooking) => addAddress(props),
  })
  return query
}
export default useAddBooking

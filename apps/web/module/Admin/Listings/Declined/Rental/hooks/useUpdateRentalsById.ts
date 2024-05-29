import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Rentals } from "@repo/contract"

export async function updateRentalsById(
  id: number | undefined,
  props: T_Rentals
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_RENTALS}/${id}`, props)
}

function useUpdateRentalsById(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Rentals) => updateRentalsById(id, props),
  })
  return query
}

export default useUpdateRentalsById

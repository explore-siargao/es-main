import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Rental_Basic_Info } from "@repo/contract"

export async function updateRentalBasicInfo(
  id: number | undefined,
  props: T_Rental_Basic_Info
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_RENTALS}/${id}/basic-info`, props)
}

function useUpdateRentalBasicInfo(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Rental_Basic_Info) =>
      updateRentalBasicInfo(id, props),
  })
  return query
}

export default useUpdateRentalBasicInfo

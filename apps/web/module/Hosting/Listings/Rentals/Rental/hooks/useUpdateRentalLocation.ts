import { API_URL_RENTALS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Listing_Location } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateRentalLocation(
  id: number | undefined,
  props: T_Listing_Location
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_RENTALS}/${id}/location`, props)
}

function useUpdateRentalLocation(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Listing_Location) => updateRentalLocation(id, props),
  })
  return query
}

export default useUpdateRentalLocation

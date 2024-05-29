import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Listing_Location } from "@repo/contract"

export async function updatePropertyLocation(
  id: number | undefined,
  props: T_Listing_Location
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_PROPERTIES}/${id}/location`, props)
}

function useUpdatePropertyLocation(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Listing_Location) =>
      updatePropertyLocation(id, props),
  })
  return query
}

export default useUpdatePropertyLocation

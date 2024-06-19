import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Listing_Location } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updatePropertyLocation(
  _id: string | undefined,
  props: T_Listing_Location
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(`${API_URL_PROPERTIES}/${_id}/location`, props)
}

function useUpdatePropertyLocation(_id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Listing_Location) =>
      updatePropertyLocation(_id, props),
  })
  return query
}

export default useUpdatePropertyLocation

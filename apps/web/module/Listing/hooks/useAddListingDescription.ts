import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_ListingDescription } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function addDescription(
  userID: number,
  listingId: number | undefined,
  props: T_ListingDescription
) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_LISTINGS}/${userID}/listing-description/${listingId}`,
    props
  )
}
function useAddListingDescription(userID: number, listingId: number) {
  const query = useMutation({
    mutationFn: (props: T_ListingDescription) =>
      addDescription(userID, listingId, props),
  })
  return query
}
export default useAddListingDescription

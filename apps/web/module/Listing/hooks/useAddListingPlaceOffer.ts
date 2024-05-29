import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_ListingPlaceOffer } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function addListingPlaceOffer(
  userId: number | undefined,
  props: T_ListingPlaceOffer
) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_LISTINGS}/${userId}/listing-place-offers`,
    props
  )
}

function useAddListingPlaceOffer(userId: number) {
  const query = useMutation({
    mutationFn: (props: T_ListingPlaceOffer) =>
      addListingPlaceOffer(userId, props),
  })
  return query
}
export default useAddListingPlaceOffer

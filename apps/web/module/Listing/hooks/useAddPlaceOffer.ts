import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_PlaceOffers } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function addPlaceOffer(
  userId: number | undefined,
  props: T_PlaceOffers
) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_LISTINGS}/${userId}/place-offers`,
    props
  )
}

function useAddPlaceOffer(userId: number) {
  const query = useMutation({
    mutationFn: (props: T_PlaceOffers) => addPlaceOffer(userId, props),
  })
  return query
}
export default useAddPlaceOffer

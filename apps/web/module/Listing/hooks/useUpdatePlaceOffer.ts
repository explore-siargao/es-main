import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_PlaceOffers } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updatePlaceOffer(
  userId: number | null,
  props: T_PlaceOffers
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/place-offers/${props.id}`,
    props
  )
}

function useUpdatePlaceOffer(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: T_PlaceOffers) => updatePlaceOffer(userId, props),
  })
  return query
}
export default useUpdatePlaceOffer

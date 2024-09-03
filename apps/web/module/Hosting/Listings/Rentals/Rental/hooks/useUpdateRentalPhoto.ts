import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Photo } from "@repo/contract"

export async function updateRentalPhoto(
  rentalId: string | undefined,
  props: T_Photo
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_RENTALS}/${rentalId}/photo/${props._id}`,
    props
  )
}

function useUpdateRentalPhoto(rentalId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Photo) => updateRentalPhoto(rentalId, props),
  })
  return query
}
export default useUpdateRentalPhoto

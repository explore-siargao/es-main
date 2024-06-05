import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Photo } from "@repo/contract"

export async function updateRentalPhotos(
  id: string | undefined,
  props: { photos: T_Photo[] }
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(`${API_URL_RENTALS}/${id}/photos`, props)
}

function useUpdateRentalPhotos(id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: { photos: T_Photo[] }) => updateRentalPhotos(id, props),
  })
  return query
}
export default useUpdateRentalPhotos

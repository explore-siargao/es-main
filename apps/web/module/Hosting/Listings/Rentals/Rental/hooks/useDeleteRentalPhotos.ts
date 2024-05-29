import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function deleteRentalPhotos(
  id: number | undefined,
  photoId: number | undefined
) {
  const apiService = new ApiService("mock")
  return await apiService.delete(`${API_URL_RENTALS}/${id}/photos/${photoId}`)
}

function useDeleteRentalPhotos(
  id: number | undefined,
  photoId: number | undefined
) {
  const query = useMutation({
    mutationFn: () => deleteRentalPhotos(id, photoId),
  })
  return query
}

export default useDeleteRentalPhotos

import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function deleteRentalPhotos(
  id: string | undefined,
  photoId: string | undefined
) {
  const apiService = new ApiService()
  return await apiService.delete(`${API_URL_RENTALS}/${id}/photos/${photoId}`)
}

function useDeleteRentalPhotos(
  id: string | undefined,
  photoId: string | undefined
) {
  const query = useMutation({
    mutationFn: () => deleteRentalPhotos(id, photoId),
  })
  return query
}

export default useDeleteRentalPhotos

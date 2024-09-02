import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Photo } from "@repo/contract"

export async function updatePropertyPhotos(
  id: string | undefined,
  props: { photos: T_Photo[] }
) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_PROPERTIES}/${id}/photos`, props)
}

function useUpdatePropertyPhotos(id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: { photos: T_Photo[] }) =>
      updatePropertyPhotos(id, props),
  })
  return query
}
export default useUpdatePropertyPhotos

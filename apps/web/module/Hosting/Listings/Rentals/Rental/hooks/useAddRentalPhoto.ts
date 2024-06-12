import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Photo } from "@repo/contract"

export async function addRentalPhotos(
  rentalId: string | undefined,
  props: T_Photo
) {
  const formData = new FormData()
  formData.append("file", props.file as File)
  formData.append("isMain", String(props.isMain))
  formData.append("description", props.description)
  formData.append("tags", props.tags)
  const apiService = new ApiService("v2")
  return await apiService.post(
    `${API_URL_RENTALS}/${rentalId}/photo`,
    formData,
    true, // raw form data
    true // remove content type
  )
}

function useAddRentalPhoto(rentalId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Photo) => addRentalPhotos(rentalId, props),
  })
  return query
}
export default useAddRentalPhoto

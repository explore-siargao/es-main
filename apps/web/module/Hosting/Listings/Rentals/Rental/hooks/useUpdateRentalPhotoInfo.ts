import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

interface IPhotoInfo {
  id: number
  tag?: string
  description?: string
}
export async function updatePhoInfo(id: number | undefined, props: IPhotoInfo) {
  const apiService = new ApiService("mock")
  return await apiService.patch(
    `${API_URL_RENTALS}/${id}/photos/${props.id}`,
    props
  )
}

function useUpdateRentalPhotoInfo(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: IPhotoInfo) => updatePhoInfo(id, props),
  })
  return query
}

export default useUpdateRentalPhotoInfo

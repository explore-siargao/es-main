import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_BasicAboutPlace } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateBasicAboutPlace(
  userId: number | null,
  props: T_BasicAboutPlace
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/basic-about-place/${props.id}`,
    props
  )
}

function useUpdateBasicAboutPlace(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: T_BasicAboutPlace) =>
      updateBasicAboutPlace(userId, props),
  })
  return query
}
export default useUpdateBasicAboutPlace

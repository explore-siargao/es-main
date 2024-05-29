import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_Highlights } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateHighlight(
  userId: number | null,
  props: T_Highlights
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/highlights/${props.id}`,
    props
  )
}

function useUpdateHighlight(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: T_Highlights) => updateHighlight(userId, props),
  })
  return query
}
export default useUpdateHighlight

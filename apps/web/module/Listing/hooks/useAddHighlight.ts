import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_Highlights } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function addHighlight(
  userId: number | undefined,
  props: T_Highlights
) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_LISTINGS}/${userId}/highlights`,
    props
  )
}

function useAddHighlight(userId: number) {
  const query = useMutation({
    mutationFn: (props: T_Highlights) => addHighlight(userId, props),
  })
  return query
}
export default useAddHighlight

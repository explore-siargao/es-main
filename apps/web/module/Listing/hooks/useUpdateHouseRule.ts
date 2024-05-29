import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_HouseRule } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateHouseRule(
  userId: number | null,
  props: T_HouseRule
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/house-rules/${props.id}`,
    props
  )
}

function useUpdateHouseRule(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: T_HouseRule) => updateHouseRule(userId, props),
  })
  return query
}
export default useUpdateHouseRule

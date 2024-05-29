import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_Rule } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateRule(userId: number | null, props: T_Rule) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/rules/${props.id}`,
    props
  )
}

function useUpdateRule(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: T_Rule) => updateRule(userId, props),
  })
  return query
}
export default useUpdateRule

import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function removeRule(userId: number, ruleId: number) {
  const apiService = new ApiService()
  return await apiService.delete(
    `${API_URL_LISTINGS}/${userId}/rules/${ruleId}`
  )
}

function useRemoveRule(userId: number, ruleId: number) {
  const query = useMutation({
    mutationFn: () => removeRule(userId, ruleId),
  })
  return query
}
export default useRemoveRule

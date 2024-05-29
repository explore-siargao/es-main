import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { T_SafetyProperty } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateSafetyProperty(
  userId: number | null,
  props: T_SafetyProperty
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_LISTINGS}/${userId}/safety-properties/${props.id}`,
    props
  )
}

function useUpdateSafetyProperty(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: T_SafetyProperty) =>
      updateSafetyProperty(userId, props),
  })
  return query
}
export default useUpdateSafetyProperty

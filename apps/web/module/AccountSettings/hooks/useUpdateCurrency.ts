import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

interface ICuurency {
  currency: string
}
export async function updateCurrency(
  personalInfoId: number | null,
  props: ICuurency
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_USERS}/personal-info/currency/${personalInfoId}`,
    props
  )
}

function useUpdateCurrency(personalInfoId: number | null) {
  const query = useMutation({
    mutationFn: (props: ICuurency) => updateCurrency(personalInfoId, props),
  })
  return query
}
export default useUpdateCurrency

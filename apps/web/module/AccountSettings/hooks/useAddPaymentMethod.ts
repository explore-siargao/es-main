import { ApiService } from "@/common/service/api"
import { API_URL_PAYMENTS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_AddPaymentMethod } from "@repo/contract"

export async function addPaymentMethod(
  userId: number | undefined,
  props: T_AddPaymentMethod
) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_PAYMENTS}/${userId}/payment-method`,
    props
  )
}
function useAddPaymentMethod(userId: number) {
  const query = useMutation({
    mutationFn: (props: T_AddPaymentMethod) => addPaymentMethod(userId, props),
  })
  return query
}
export default useAddPaymentMethod

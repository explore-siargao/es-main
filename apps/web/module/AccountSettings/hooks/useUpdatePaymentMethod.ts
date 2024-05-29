import { ApiService } from "@/common/service/api"
import { IPaymentMethod } from "@/common/types/global"
import { API_URL_PAYMENTS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function updatePaymentMethod(
  userId: number | null,
  props: IPaymentMethod
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_PAYMENTS}/${userId}/payment-method/${props.id}`,
    props
  )
}

function useUpdatePaymentMethod(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: IPaymentMethod) => updatePaymentMethod(userId, props),
  })
  return query
}
export default useUpdatePaymentMethod

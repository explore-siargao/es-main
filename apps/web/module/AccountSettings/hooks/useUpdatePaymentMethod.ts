import { ApiService } from "@/common/service/api"
import { IPaymentMethod } from "@/common/types/global"
import { API_URL_PAYMENTS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function updatePaymentMethod(props: IPaymentMethod) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_PAYMENTS}/payment-method/${props.id}`,
    props
  )
}

function useUpdatePaymentMethod() {
  const query = useMutation({
    mutationFn: (props: IPaymentMethod) => updatePaymentMethod(props),
  })
  return query
}
export default useUpdatePaymentMethod

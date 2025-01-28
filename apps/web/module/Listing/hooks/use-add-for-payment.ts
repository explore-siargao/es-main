import {
  ForPaymentService,
  T_Add_For_Payment,
} from "@repo/contract-2/for-payment-listings"
import { useMutation } from "@tanstack/react-query"

export async function addForPayment(props: T_Add_For_Payment) {
  const forPayment = new ForPaymentService()
  return await forPayment.addForPayment(props)
}

function useAddForPayment() {
  const query = useMutation({
    mutationFn: (props: T_Add_For_Payment) => addForPayment(props),
  })
  return query
}

export default useAddForPayment

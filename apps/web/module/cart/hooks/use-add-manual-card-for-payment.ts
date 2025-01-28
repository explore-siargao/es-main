import { T_Add_To_Cart } from "@repo/contract-2/cart"
import { T_Add_For_Payment } from "@repo/contract-2/for-payment-listings"
import { ReservationService } from "@repo/contract-2/reservations"
import { useMutation } from "@tanstack/react-query"

export async function addCardForPayment(props: any) {
  const reservation = new ReservationService()
  return await reservation.payForPayment(props, "manual")
}

function useAddManualCardForPayment() {
  const query = useMutation({
    mutationFn: (props: any) => addCardForPayment(props),
  })
  return query
}

export default useAddManualCardForPayment

import { T_Add_For_Payment } from "@repo/contract-2/for-payment-listings"
import { ReservationService } from "@repo/contract-2/reservations"
import { useMutation } from "@tanstack/react-query"

export async function addGCashForPayment(props: T_Add_For_Payment) {
  const reservation = new ReservationService()
  return await reservation.payForPayment(props, "gcash")
}

function useAddGCashForPayment() {
  const query = useMutation({
    mutationFn: (props: T_Add_For_Payment) => addGCashForPayment(props),
  })
  return query
}

export default useAddGCashForPayment

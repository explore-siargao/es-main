import { T_Add_To_Cart } from "@repo/contract-2/cart"
import { ReservationService } from "@repo/contract-2/reservations"
import { useMutation } from "@tanstack/react-query"

export async function addGCashForPayment(props: any) {
  const reservation = new ReservationService()
  return await reservation.payForPayment(props, "gcash")
}

function useAddGCashForPayment() {
  const query = useMutation({
    mutationFn: (props: T_Add_To_Cart) => addGCashForPayment(props),
  })
  return query
}

export default useAddGCashForPayment

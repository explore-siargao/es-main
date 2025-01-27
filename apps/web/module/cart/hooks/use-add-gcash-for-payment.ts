import { T_Add_To_Cart } from "@repo/contract-2/cart"
import { ReservationService } from "@repo/contract-2/reservations"
import { useMutation } from "@tanstack/react-query"

type T_Props = {
  cartItems: T_Add_To_Cart[]
}

export async function addGCashForPayment(props: T_Props) {
  const reservation = new ReservationService()
  return await reservation.payForPayment(props, "gcash")
}

function useAddGCashForPayment() {
  const query = useMutation({
    mutationFn: (props: T_Props) => addGCashForPayment(props),
  })
  return query
}

export default useAddGCashForPayment

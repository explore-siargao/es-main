import { T_Add_To_Cart } from "@repo/contract-2/cart"
import { T_Add_For_Payment } from "@repo/contract-2/for-payment-listings"
import { ReservationService } from "@repo/contract-2/reservations"
import { useMutation } from "@tanstack/react-query"

type T_Props = {
  cartItems: T_Add_For_Payment[]
  cardInfo: string | undefined
}
export async function addCardPayment(props: T_Props) {
  const reservation = new ReservationService()
  return await reservation.payForPayment(props, "manual")
}

function useAddManualCardPayment() {
  const query = useMutation({
    mutationFn: (props: T_Props) => addCardPayment(props),
  })
  return query
}

export default useAddManualCardPayment

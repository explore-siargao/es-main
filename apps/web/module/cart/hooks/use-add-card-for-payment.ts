import { T_Add_To_Cart } from "@repo/contract-2/cart"
import { ReservationService } from "@repo/contract-2/reservations"
import { useMutation } from "@tanstack/react-query"

type T_Props = {
  cartItems: T_Add_To_Cart
  paymentMethodId: string
  cvv: string
  hmac: string
  expirationDate: Date
}

export async function addCardForPayment(props: T_Props) {
  const reservation = new ReservationService()
  return await reservation.payForPayment(props, "card")
}

function useAddCardForPayment() {
  const query = useMutation({
    mutationFn: (props: T_Props) => addCardForPayment(props),
  })
  return query
}

export default useAddCardForPayment

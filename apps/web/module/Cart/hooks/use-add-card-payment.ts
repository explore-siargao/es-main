import { T_Add_To_Cart } from "@repo/contract-2/cart"
import { ReservationService } from "@repo/contract-2/reservations"
import { useMutation } from "@tanstack/react-query"

type T_Props = {
  cartItems: T_Add_To_Cart[]
  paymentMethodId: string
  cvv: string
}

export async function addCardPayment(props: T_Props) {
  const reservation = new ReservationService()
  return await reservation.payCart(props, "card")
}

function useAddCardPayment() {
  const query = useMutation({
    mutationFn: (props: T_Props) => addCardPayment(props),
  })
  return query
}

export default useAddCardPayment

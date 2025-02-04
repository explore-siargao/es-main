import { T_Add_To_Cart } from "@repo/contract-2/cart"
import { ReservationService } from "@repo/contract-2/reservations"
import { useMutation } from "@tanstack/react-query"

type T_Props = {
  cartItems: T_Add_To_Cart[]
  cardInfo: string | undefined
}
export async function addCardPayment(props: T_Props) {
  const reservation = new ReservationService()
  return await reservation.payCart(props, "manual")
}

function useAddManualCardPayment() {
  const query = useMutation({
    mutationFn: (props: T_Props) => addCardPayment(props),
  })
  return query
}

export default useAddManualCardPayment

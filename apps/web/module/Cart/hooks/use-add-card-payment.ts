import { T_Add_To_Cart } from "@repo/contract-2/cart"
import { ReservationService } from "@repo/contract-2/reservations"
import { useMutation } from "@tanstack/react-query"

export async function addCardPayment(props: T_Add_To_Cart[]) {
  const reservation = new ReservationService()
  return await reservation.addItem(props, "card")
}

function useAddCardPayment() {
  const query = useMutation({
    mutationFn: (props: T_Add_To_Cart[]) => addCardPayment(props),
  })
  return query
}

export default useAddCardPayment

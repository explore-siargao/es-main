import { T_Add_To_Cart } from "@repo/contract-2/cart"
import { ReservationService } from "@repo/contract-2/reservations"
import { useMutation } from "@tanstack/react-query"

export async function addGCashPayment(props: T_Add_To_Cart[]) {
  const reservation = new ReservationService()
  return await reservation.addItem(props, "gcash")
}

function useAddGCashPayment() {
  const query = useMutation({
    mutationFn: (props: T_Add_To_Cart[]) => addGCashPayment(props),
  })
  return query
}

export default useAddGCashPayment

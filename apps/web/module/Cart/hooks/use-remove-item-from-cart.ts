import { CartService } from "@repo/contract-2/cart"
import { useMutation } from "@tanstack/react-query"

export async function removeItemFromCart(
  props: string
) {
  const cart = new CartService()
  return await cart.removeItem(props)
}

function useRemoveItemFromCart() {
  const query = useMutation({
    mutationFn: (props: string) =>
      removeItemFromCart(props),
  })
  return query
}

export default useRemoveItemFromCart
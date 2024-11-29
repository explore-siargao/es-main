import { CartService } from "@repo/contract-2/cart"
import { useMutation } from "@tanstack/react-query"

export async function removeMultipleItemsFromCart(props: string[]) {
  const cart = new CartService()
  return await cart.removeMultipleItems(props)
}

function useRemoveMultipleItemsFromCart() {
  const query = useMutation({
    mutationFn: (props: string[]) => removeMultipleItemsFromCart(props),
  })
  return query
}

export default useRemoveMultipleItemsFromCart

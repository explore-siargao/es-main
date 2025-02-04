import { CartService, T_Add_To_Cart } from "@repo/contract-2/cart"
import { useMutation } from "@tanstack/react-query"

export async function addToCart(props: T_Add_To_Cart) {
  const cart = new CartService()
  return await cart.addItem(props)
}

function useAddToCart() {
  const query = useMutation({
    mutationFn: (props: T_Add_To_Cart) => addToCart(props),
  })
  return query
}

export default useAddToCart

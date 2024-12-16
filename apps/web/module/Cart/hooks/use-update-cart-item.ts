import { CartService, T_Update_Cart } from "@repo/contract-2/cart"
import { useMutation } from "@tanstack/react-query"

type T_Props = { itemId: string; item: T_Update_Cart }

export async function updateCartItem(props: T_Props) {
  const cart = new CartService()
  return await cart.updateItem(props.itemId, props.item)
}

function useUpdateCartItem() {
  const query = useMutation({
    mutationFn: (props: T_Props) => updateCartItem(props),
  })
  return query
}

export default useUpdateCartItem

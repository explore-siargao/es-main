// this is an example implementation, this needs to be deleted
import { useQuery } from "@tanstack/react-query"
import { CartService } from "@repo/contract-2/cart"

const queryKeys = CartService.getQueryKeys();

export async function getItems() {
  const cart = new CartService()
  return await cart.getItems()
}

function useGetCartItems() {
  const query = useQuery({
    queryKey: [queryKeys.getItems],
    queryFn: () => getItems(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetCartItems

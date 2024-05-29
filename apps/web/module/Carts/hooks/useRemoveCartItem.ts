import { ApiService } from "@/common/service/api"
import { API_URL_CARTS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

interface CartIds {
  cartIds: number[]
}

export async function removeCartItem(props: CartIds) {
  const apiService = new ApiService("mock")
  return await apiService.delete(`${API_URL_CARTS}/`, props)
}

function useRemoveCartItem() {
  const query = useMutation({
    mutationFn: (props: CartIds) => removeCartItem(props),
  })
  return query
}
export default useRemoveCartItem

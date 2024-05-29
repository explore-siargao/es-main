import { API_URL_CARTS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Carts } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateCartItem(id: number | null, props: T_Carts) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_CARTS}/${id}`, props)
}

function useUpdateCartItem(id: number | null) {
  const query = useMutation({
    mutationFn: (props: T_Carts) => updateCartItem(id, props),
  })
  return query
}

export default useUpdateCartItem

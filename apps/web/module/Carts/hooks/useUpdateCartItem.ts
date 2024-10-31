import { API_URL_CARTS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

export async function updateCartItem(id: number | null, props: any) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_CARTS}/${id}`, props)
}

function useUpdateCartItem(id: number | null) {
  const query = useMutation({
    mutationFn: (props: any) => updateCartItem(id, props),
  })
  return query
}

export default useUpdateCartItem

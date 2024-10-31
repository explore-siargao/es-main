import { ApiService } from "@/common/service/api"
import { API_URL_CARTS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function addCartItem(props: any) {
  const apiService = new ApiService("mock")
  return await apiService.post(`${API_URL_CARTS}`, props)
}

function useAddCartItem() {
  const query = useMutation({
    mutationFn: (props: any) => addCartItem(props),
  })
  return query
}
export default useAddCartItem

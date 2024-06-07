import { ApiService } from "@/common/service/api"
import { ICoupon } from "@/common/types/global"
import { API_URL_PAYMENTS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function updateCoupon(props: ICoupon, id: string) {
  const apiService = new ApiService("v2")
  return await apiService.patch(`${API_URL_PAYMENTS}/coupon/${id}`, props)
}

function useUpdateCoupon(id: string) {
  const query = useMutation({
    mutationFn: (props: ICoupon) => updateCoupon(props, id),
  })
  return query
}
export default useUpdateCoupon

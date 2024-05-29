import { ApiService } from "@/common/service/api"
import { ICoupon } from "@/common/types/global"
import { API_URL_PAYMENTS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function updateCoupon(userId: number | null, props: ICoupon) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_PAYMENTS}/${userId}/coupon`, props)
}

function useUpdateCoupon(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: ICoupon) => updateCoupon(userId, props),
  })
  return query
}
export default useUpdateCoupon

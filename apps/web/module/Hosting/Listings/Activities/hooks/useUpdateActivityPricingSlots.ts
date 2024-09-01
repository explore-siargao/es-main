import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Update_Activity_Price_Slots } from "@repo/contract"

export async function updateActivityPricingSlots(
  id: string | undefined,
  props: T_Update_Activity_Price_Slots
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_ACTIVITIES}/${id}/price-slots`,
    props
  )
}

function useUpdateActivityPricingSlots(id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Activity_Price_Slots) =>
      updateActivityPricingSlots(id, props),
  })
  return query
}
export default useUpdateActivityPricingSlots

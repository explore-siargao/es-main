import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type T_UnitPrice = {
  fromDate: string
  toDate: string
  price: number
}

export async function updateUnitPricePerDate(props: T_UnitPrice, id: string) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_ACTIVITIES}/${id}/price-per-dates`,
    props
  )
}

function useUpdateActivityPricePerDate(id: string) {
  const query = useMutation({
    mutationFn: (props: T_UnitPrice) => updateUnitPricePerDate(props, id),
  })
  return query
}
export default useUpdateActivityPricePerDate

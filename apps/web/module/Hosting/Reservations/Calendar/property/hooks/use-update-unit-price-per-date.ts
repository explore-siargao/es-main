import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type T_UnitPrice = {
  fromDate: string
  toDate: string
  baseRate: number
}

export async function updateUnitPricePerDate(props: T_UnitPrice, id: string) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${id}/price-per-dates`,
    props
  )
}

function useUpdateUnitPricePerDate(id: string) {
  const query = useMutation({
    mutationFn: (props: T_UnitPrice) => updateUnitPricePerDate(props, id),
  })
  return query
}
export default useUpdateUnitPricePerDate

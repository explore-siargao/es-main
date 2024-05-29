import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_UnitPrice } from "@repo/contract"

interface IUnitPrice {
  id: number
  unitPrices: T_UnitPrice[]
}
export async function updateUnitPrices(
  propertyId: number | undefined,
  props: IUnitPrice
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/units/${props.id}/price`,
    props
  )
}

function useUpdateUnitPrices(propertyId: number | undefined) {
  const query = useMutation({
    mutationFn: (props: IUnitPrice) => updateUnitPrices(propertyId, props),
  })
  return query
}
export default useUpdateUnitPrices

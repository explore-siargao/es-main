import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_UnitPrice } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updatePropertyUnitPriceById(
  propertyId: string | undefined,
  unitPrices: T_UnitPrice[]
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/units/pricing`,
    unitPrices
  )
}

function useUpdatePropertyUnitPriceById(propertyId: string | undefined) {
  const query = useMutation({
    mutationFn: (unitPrices: T_UnitPrice[]) =>
      updatePropertyUnitPriceById(propertyId, unitPrices),
  })
  return query
}

export default useUpdatePropertyUnitPriceById

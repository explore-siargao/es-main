import { useMutation } from "@tanstack/react-query"
import { T_Property_Facility } from "@repo/contract"
import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"

interface IFacility {
  facilities: T_Property_Facility[]
}

export async function addFacilityOfBookableUnitType(
  bookableUnitTypeId: number | undefined,
  props: IFacility
) {
  const apiService = new ApiService("mock")
  return await apiService.post(
    `${API_URL_PROPERTIES}/${bookableUnitTypeId}/facility-unit-type`,
    props
  )
}

function useAddFacilityOfBookableUnitType(bookableUnitTypeId: number) {
  const query = useMutation({
    mutationFn: (props: IFacility) =>
      addFacilityOfBookableUnitType(bookableUnitTypeId, props),
  })
  return query
}
export default useAddFacilityOfBookableUnitType

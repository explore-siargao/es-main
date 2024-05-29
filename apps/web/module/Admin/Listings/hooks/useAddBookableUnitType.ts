import { ApiService } from "@/common/service/api"
import { API_URL_BOOKABLE_UNIT_TYPE } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_BookableUnitType } from "@repo/contract"

export async function addBookableUnitType(
  hostId: number | undefined,
  props: T_BookableUnitType
) {
  const apiService = new ApiService("mock")
  return await apiService.post(
    `${API_URL_BOOKABLE_UNIT_TYPE}/host/${hostId}`,
    props
  )
}

function useAddBookableUnitType(hostId: number) {
  const query = useMutation({
    mutationFn: (props: T_BookableUnitType) =>
      addBookableUnitType(hostId, props),
  })
  return query
}
export default useAddBookableUnitType

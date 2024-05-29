import { ApiService } from "@/common/service/api"
import { API_URL_BOOKABLE_UNIT_TYPE } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_BookableUnitType } from "@repo/contract"

export async function updateBookableUnitType(
  id: number | undefined,
  hostId: number | undefined,
  props: T_BookableUnitType
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(
    `${API_URL_BOOKABLE_UNIT_TYPE}/host/${hostId}/${id}`,
    props
  )
}

function useUpdateBookableUnitType(
  id: number | undefined,
  hostId: number | undefined
) {
  const query = useMutation({
    mutationFn: (props: T_BookableUnitType) =>
      updateBookableUnitType(id, hostId, props),
  })
  return query
}
export default useUpdateBookableUnitType

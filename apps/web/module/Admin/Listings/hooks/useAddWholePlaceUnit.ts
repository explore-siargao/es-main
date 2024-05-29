import { useMutation } from "@tanstack/react-query"
import { T_AddWholePlaceUnit } from "@repo/contract"
import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"

export async function addWholeUnit(
  id: number | undefined,
  props: T_AddWholePlaceUnit
) {
  const apiService = new ApiService("mock")
  return await apiService.post(
    `${API_URL_PROPERTIES}/${id}/units/whole-place`,
    props
  )
}

function useAddWholePlaceUnit(id: number) {
  const query = useMutation({
    mutationFn: (props: T_AddWholePlaceUnit) => addWholeUnit(id, props),
  })
  return query
}
export default useAddWholePlaceUnit

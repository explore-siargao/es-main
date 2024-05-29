import { useMutation } from "@tanstack/react-query"
import { T_AddRoomUnit } from "@repo/contract"
import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"

export async function addRoomUnit(
  id: number | undefined,
  props: T_AddRoomUnit
) {
  const apiService = new ApiService("mock")
  return await apiService.post(`${API_URL_PROPERTIES}/${id}/units/room`, props)
}

function useAddRoomUnit(id: number) {
  const query = useMutation({
    mutationFn: (props: T_AddRoomUnit) => addRoomUnit(id, props),
  })
  return query
}
export default useAddRoomUnit

import { useMutation } from "@tanstack/react-query"
import { T_AddBedUnit } from "@repo/contract"
import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"

export async function addbedUnit(id: number | undefined, props: T_AddBedUnit) {
  const apiService = new ApiService("mock")
  return await apiService.post(`${API_URL_PROPERTIES}/${id}/units/bed`, props)
}

function useAddBedUnit(id: number) {
  const query = useMutation({
    mutationFn: (props: T_AddBedUnit) => addbedUnit(id, props),
  })
  return query
}
export default useAddBedUnit

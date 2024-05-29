import { ApiService } from "@/common/service/api"
import { API_URL_BOOKABLE_UNIT } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_BookableUnit } from "@repo/contract"

export async function updateBookableUnit(
  id: number | undefined,
  props: T_BookableUnit
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_BOOKABLE_UNIT}/${id}`, props)
}

function useUpdateBookableUnit(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: T_BookableUnit) => updateBookableUnit(id, props),
  })
  return query
}
export default useUpdateBookableUnit

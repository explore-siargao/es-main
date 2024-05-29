import { ApiService } from "@/common/service/api"
import { API_URL_BOOKABLE_UNIT } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_BookableUnit } from "@repo/contract"

export async function addBookableUnit(
  hostId: number | undefined,
  props: T_BookableUnit
) {
  const apiService = new ApiService("mock")
  return await apiService.post(`${API_URL_BOOKABLE_UNIT}/host/${hostId}`, props)
}

function useAddBookableUnit(hostId: number) {
  const query = useMutation({
    mutationFn: (props: T_BookableUnit) => addBookableUnit(hostId, props),
  })
  return query
}
export default useAddBookableUnit

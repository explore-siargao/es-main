import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type UnitChild = {
  id: string
  name: string
}
export async function updateCalendarUnitName(props: UnitChild) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_PROPERTIES}/update-units`, props)
}

function useUpdateCalendarUnitName() {
  const query = useMutation({
    mutationFn: (props: UnitChild) => updateCalendarUnitName(props),
  })
  return query
}
export default useUpdateCalendarUnitName

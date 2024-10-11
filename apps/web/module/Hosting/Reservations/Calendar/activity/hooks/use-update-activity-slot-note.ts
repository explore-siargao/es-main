import { ApiService } from "@/common/service/api"
import { API_URL_ACTIVITIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

type T_Slot = {
  id: string
  note: string
}

export async function updateActivitySlotNote(props: T_Slot) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_ACTIVITIES}/private/update-slot-note`, props)
}

function useUpdateActivitySlotNote() {
  const query = useMutation({
    mutationFn: (props: T_Slot) => updateActivitySlotNote(props),
  })
  return query
}
export default useUpdateActivitySlotNote

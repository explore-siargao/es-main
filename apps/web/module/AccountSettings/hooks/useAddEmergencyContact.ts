import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_AddEmergencyContact } from "@repo/contract/src/EmergencyContact/type"

export async function addEmergencyContact(
  guestId: string | undefined,
  props: T_AddEmergencyContact
) {
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_USERS}/${guestId}/emergency-contact/add`,
    props
  )
}

function useAddEmergencyContact(guestId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_AddEmergencyContact) =>
      addEmergencyContact(guestId, props),
  })
  return query
}
export default useAddEmergencyContact

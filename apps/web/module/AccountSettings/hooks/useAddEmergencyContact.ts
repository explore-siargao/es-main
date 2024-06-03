import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_AddEmergencyContact } from "@repo/contract/src/EmergencyContact/type"

export async function addEmergencyContact(
  personId: number | undefined,
  props: T_AddEmergencyContact
) {
  const apiService = new ApiService("v2")
  return await apiService.post(
    `${API_URL_USERS}/${personId}/emergency-contact/add`,
    props
  )
}

function useAddEmergencyContact(personId: number) {
  const query = useMutation({
    mutationFn: (props: T_AddEmergencyContact) =>
      addEmergencyContact(personId, props),
  })
  return query
}
export default useAddEmergencyContact

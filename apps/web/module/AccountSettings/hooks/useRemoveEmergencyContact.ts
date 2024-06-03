import { ApiService } from "@/common/service/api"
import { IEmergencyContact } from "@/common/types/global"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function removeEmergencyContact(
  personalInfoId: number,
  id: number
) {
  const apiService = new ApiService("v2")
  return await apiService.delete(
    `${API_URL_USERS}/${personalInfoId}/emergency-contact/${id}`
  )
}

function useRemoveEmergencyContact(personalInfoId: number) {
  const query = useMutation({
    mutationFn: (props: IEmergencyContact) =>
      removeEmergencyContact(personalInfoId, props?.id as number),
  })
  return query
}
export default useRemoveEmergencyContact

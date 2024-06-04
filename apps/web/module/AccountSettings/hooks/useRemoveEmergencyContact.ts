import { ApiService } from "@/common/service/api"
import { IEmergencyContact } from "@/common/types/global"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function removeEmergencyContact(id: string) {
  const apiService = new ApiService("v2")
  return await apiService.delete(`${API_URL_USERS}/emergency-contact/${id}`)
}

function useRemoveEmergencyContact(guestId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: IEmergencyContact) =>
      removeEmergencyContact(props?.id as string),
  })
  return query
}
export default useRemoveEmergencyContact

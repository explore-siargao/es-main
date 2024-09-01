import { ApiService } from "@/common/service/api"
import { IPersonalInfo } from "@/common/types/global"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function updatePersonalInfo(
  userId: string | undefined,
  props: IPersonalInfo
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_USERS}/personal-info/${userId}`,
    props
  )
}

function useUpdatePersonalInfo(userId: string) {
  const query = useMutation({
    mutationFn: (props: IPersonalInfo) => updatePersonalInfo(userId, props),
  })
  return query
}
export default useUpdatePersonalInfo

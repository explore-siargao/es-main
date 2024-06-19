import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Property_Basic_Info } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updatePropertyBasicInfo(
  _id: string | undefined,
  props: T_Property_Basic_Info
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${_id}/basic-info`,
    props
  )
}

function useUpdatePropertyBasicInfo(_id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Property_Basic_Info) =>
      updatePropertyBasicInfo(_id, props),
  })
  return query
}

export default useUpdatePropertyBasicInfo

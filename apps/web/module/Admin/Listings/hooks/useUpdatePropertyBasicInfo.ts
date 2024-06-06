import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Property_Basic_Info } from "@repo/contract"

export async function updatePropertyBasicInfo(
  id: string | undefined,
  props: T_Property_Basic_Info
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(`${API_URL_PROPERTIES}/${id}/basic-info`, props)
}

function useUpdatePropertyBasicInfo(id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Property_Basic_Info) =>
      updatePropertyBasicInfo(id, props),
  })
  return query
}

export default useUpdatePropertyBasicInfo

import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

interface IBedBasicInfo {
  _id: string
  title: string
  description: string
  qty: number
}

export async function updateBedBasicInfo(
  _id: string | undefined,
  props: IBedBasicInfo
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${_id}/${props._id}/bed/basic-info`,
    props
  )
}

function useUpdateBedBasicInfo(_id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: IBedBasicInfo) => updateBedBasicInfo(_id, props),
  })
  return query
}

export default useUpdateBedBasicInfo

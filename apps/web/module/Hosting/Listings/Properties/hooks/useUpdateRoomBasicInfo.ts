import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

interface IRoomBasicInfo {
  _id: string
  title: string
  totalSize: number
  description: string
  qty: number
}

export async function updateRoomBasicInfo(
  _id: string | undefined,
  props: IRoomBasicInfo
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${_id}/${props._id}/room/basic-info`,
    props
  )
}

function useUpdateRoomBasicInfo(_id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: IRoomBasicInfo) => updateRoomBasicInfo(_id, props),
  })
  return query
}

export default useUpdateRoomBasicInfo

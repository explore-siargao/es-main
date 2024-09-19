import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"
import { IBedroom } from "../Property/Units/types"

interface IRoomBasicInfo {
  _id: string
  title: string
  subtitle?: string | ""
  totalSize: number
  description?: string | ""
  qty: number
  bedRooms: IBedroom[]
  isHaveSharedBathRoom: "Yes" | "No" | null | undefined
  isHaveSharedAmenities: "Yes" | "No" | null | undefined
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

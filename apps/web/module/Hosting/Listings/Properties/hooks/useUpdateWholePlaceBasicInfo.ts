import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

type T_BedRooms = {
  bedRoomName: string
  bedRoomType: string
}

interface IWholePlaceBasicInfo {
  _id: string
  title: string
  totalSize: number
  numBedRooms: number
  numBathRooms: number
  bedRooms: T_BedRooms[]
  qty: number
}

export async function updateWholePlaceBasicInfo(
  _id: string | undefined,
  props: IWholePlaceBasicInfo
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${_id}/${props._id}/whole-place/basic-info`,
    props
  )
}

function useUpdateWholePlaceBasicInfo(_id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: IWholePlaceBasicInfo) =>
      updateWholePlaceBasicInfo(_id, props),
  })
  return query
}

export default useUpdateWholePlaceBasicInfo

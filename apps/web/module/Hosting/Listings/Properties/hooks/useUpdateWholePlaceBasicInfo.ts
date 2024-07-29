import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"
import { T_Bedroom } from "../Property/Units/Edit/components/AddBedroomModal"

interface IWholePlaceBasicInfo {
  _id: string
  title: string
  totalSize: number
  bedRooms: T_Bedroom[]
  numBathRooms: number
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

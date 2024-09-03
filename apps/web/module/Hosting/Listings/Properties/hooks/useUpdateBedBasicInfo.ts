import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { T_Update_Bed_Basic_Info } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

// interface IBedBasicInfo {
//   _id: string
//   title: string
//   isHaveSharedBathRoom: boolean
//   isSmokingAllowed: boolean
//   description?: string
//   qty?: number
// }

export async function updateBedBasicInfo(
  _id: string | undefined,
  props: T_Update_Bed_Basic_Info
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${_id}/${props._id}/bed/basic-info`,
    props
  )
}

function useUpdateBedBasicInfo(_id: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Update_Bed_Basic_Info) =>
      updateBedBasicInfo(_id, props),
  })
  return query
}

export default useUpdateBedBasicInfo

import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { T_AddGovernmentId } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"
import { FileWithPath } from "react-dropzone"

export async function addGovernmentId(
  personId: number | undefined,
  props: T_AddGovernmentId & { file: FileWithPath }
) {
  const formData = new FormData()
  formData.append("file", props.file)
  formData.append("type", props.type)
  const apiService = new ApiService()
  return await apiService.post(
    `${API_URL_USERS}/${personId}/government-id`,
    formData,
    true, // raw form data
    true // remove content type
  )
}

function useAddGovernmentId(personId: number) {
  const query = useMutation({
    mutationFn: (props: T_AddGovernmentId & { file: FileWithPath }) =>
      addGovernmentId(personId, props),
  })
  return query
}
export default useAddGovernmentId

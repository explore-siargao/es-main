import { HostApprovalService, T_Add_Host_Approval } from "@repo/contract-2/host-approval"
import { useMutation } from "@tanstack/react-query"
import { FileWithPath } from "react-dropzone"

export async function addHostApproval(
  props: { file: FileWithPath } & T_Add_Host_Approval
) {
  const formData = new FormData()
  formData.append("file", props.file)
  formData.append("businessType", props.businessType)
  formData.append("companyName", props.companyName)
  formData.append("brn", props.brn)
  formData.append("registeredAddress", props.registeredAddress)

  const hostApprovalService = new HostApprovalService()
  return await hostApprovalService.addHostApproval(formData)
}

function useAddHostApproval() {
  const query = useMutation({
    mutationFn: (props: { file: FileWithPath } & T_Add_Host_Approval) =>
      addHostApproval(props),
  })
  return query
}

export default useAddHostApproval

import { ApiService } from "@/common/service/api"
import { API_URL_REPORTS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_ReportUser } from "@repo/contract"

export async function addReportUser(
  userId: number | undefined,
  props: T_ReportUser
) {
  const apiService = new ApiService()
  return await apiService.post(`${API_URL_REPORTS}/${userId}/user`, props)
}

function useAddReportUser(userId: number) {
  const query = useMutation({
    mutationFn: (props: T_ReportUser) => addReportUser(userId, props),
  })
  return query
}
export default useAddReportUser

import { ApiService } from "@/common/service/api"
import { API_URL_REPORTS } from "@/common/constants"
import { T_ReportListing } from "@repo/contract"
import { useMutation } from "@tanstack/react-query"

export async function updateReport(
  userId: number | null,
  props: T_ReportListing
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_REPORTS}/${userId}/listing/${props.id}`,
    props
  )
}

function useUpdateReportListing(userId: number | null) {
  const query = useMutation({
    mutationFn: (props: T_ReportListing) => updateReport(userId, props),
  })
  return query
}
export default useUpdateReportListing

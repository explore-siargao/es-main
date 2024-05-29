import { ApiService } from "@/common/service/api"
import { API_URL_REPORTS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

export async function removeReport(userId: number, reportId: number) {
  const apiService = new ApiService()
  return await apiService.delete(
    `${API_URL_REPORTS}/${userId}/listing/${reportId}`
  )
}

function useRemoveReportListing(userId: number, reportId: number) {
  const query = useMutation({
    mutationFn: () => removeReport(userId, reportId),
  })
  return query
}
export default useRemoveReportListing

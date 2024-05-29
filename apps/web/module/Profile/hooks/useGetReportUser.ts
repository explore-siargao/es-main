import { ApiService } from "@/common/service/api"
import { API_URL_REPORTS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReportUser(reportId: number | null) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_REPORTS}/user/${reportId}`)
}

function useGetReportUser(reportId: number | null) {
  const query = useQuery({
    queryKey: ["report-user", reportId],
    queryFn: () => getReportUser(reportId),
    refetchOnWindowFocus: false,
    enabled: !!reportId,
  })
  return query
}
export default useGetReportUser

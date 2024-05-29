import { ApiService } from "@/common/service/api"
import { API_URL_REPORTS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReportUsersByReportedBy(userId: number | null) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_REPORTS}/user/from/${userId}`)
}

function useGetReportusersByReportedByUser(userId: number | null) {
  const query = useQuery({
    queryKey: ["report-users", userId],
    queryFn: () => getReportUsersByReportedBy(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  })
  return query
}
export default useGetReportusersByReportedByUser

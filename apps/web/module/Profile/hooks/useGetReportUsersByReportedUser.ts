import { ApiService } from "@/common/service/api"
import { API_URL_REPORTS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReportUsersByReportedUser(userId: number | null) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_REPORTS}/user/to/${userId}`)
}

function useGetReportusersByReportedUser(userId: number | null) {
  const query = useQuery({
    queryKey: ["report-users", userId],
    queryFn: () => getReportUsersByReportedUser(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  })
  return query
}
export default useGetReportusersByReportedUser

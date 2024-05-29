import { ApiService } from "@/common/service/api"
import { API_URL_REPORTS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getAllReportUsers() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_REPORTS}/user`)
}

function useGetAllReportUsers() {
  const query = useQuery({
    queryKey: ["report-users"],
    queryFn: () => getAllReportUsers(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetAllReportUsers

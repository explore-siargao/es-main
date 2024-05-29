import { ApiService } from "@/common/service/api"
import { API_URL_REPORTS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReportListingByReportedBy(userId: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_REPORTS}/listing/from/${userId}`)
}

function useGetReportListingByReportedByuser(userId: number | undefined) {
  const query = useQuery({
    queryKey: ["report-listings", userId],
    queryFn: () => getReportListingByReportedBy(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  })
  return query
}
export default useGetReportListingByReportedByuser

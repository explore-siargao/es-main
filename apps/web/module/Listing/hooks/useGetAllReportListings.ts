import { ApiService } from "@/common/service/api"
import { API_URL_REPORTS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getAllReportListings() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_REPORTS}/listing`)
}

function useGetAllReportListings() {
  const query = useQuery({
    queryKey: ["report-listings"],
    queryFn: () => getAllReportListings(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetAllReportListings

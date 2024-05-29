import { ApiService } from "@/common/service/api"
import { API_URL_REPORTS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getReportById(id: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_REPORTS}/listing/${id}`)
}

function useGetReportListing(id: number | undefined) {
  const query = useQuery({
    queryKey: ["report-listing", id],
    queryFn: () => getReportById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetReportListing

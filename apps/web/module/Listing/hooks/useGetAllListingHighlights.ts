import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getAllListingHighlights() {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/all/listing-highlights`)
}

function useGetAllListingHighlights() {
  const query = useQuery({
    queryKey: ["listing-highlights"],
    queryFn: () => getAllListingHighlights(),
    refetchOnWindowFocus: false,
  })
  return query
}
export default useGetAllListingHighlights

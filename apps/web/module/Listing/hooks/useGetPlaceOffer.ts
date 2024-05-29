import { ApiService } from "@/common/service/api"
import { API_URL_LISTINGS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getPlaceOffer(id: number | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_LISTINGS}/place-offers/${id}`)
}

function useGetPlaceOffer(id: number | undefined) {
  const query = useQuery({
    queryKey: ["place-offer", id],
    queryFn: () => getPlaceOffer(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetPlaceOffer

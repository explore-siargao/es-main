import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getRentalBasicInfo(rentalId: string | undefined) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_RENTALS}/${rentalId}/basic-info`)
}

function useGetRentalBasicInfo(rentalId: string | undefined) {
  const query = useQuery({
    queryKey: ["rental-basic-info", rentalId],
    queryFn: () => getRentalBasicInfo(rentalId),
    refetchOnWindowFocus: false,
    enabled: !!rentalId,
  })
  return query
}
export default useGetRentalBasicInfo

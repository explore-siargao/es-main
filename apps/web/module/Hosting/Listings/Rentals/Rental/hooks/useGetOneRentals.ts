import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getOneRentals(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_RENTALS}/${id}`)
}

function useGetOneRentals(id: number | undefined) {
  const query = useQuery({
    queryKey: ["get-one-rental", id],
    queryFn: () => getOneRentals(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetOneRentals

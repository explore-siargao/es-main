import { ApiService } from "@/common/service/api"
import { API_URL_BOOKABLE_UNIT_TYPE } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getBookableUnitTypeById(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(`${API_URL_BOOKABLE_UNIT_TYPE}/${id}`)
}

function useGetBookableUnitTypeById(id: number | undefined) {
  const query = useQuery({
    queryKey: ["bookable-unit-type", id],
    queryFn: () => getBookableUnitTypeById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetBookableUnitTypeById

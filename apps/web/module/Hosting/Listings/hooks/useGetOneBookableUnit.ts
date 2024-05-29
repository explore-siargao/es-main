import { ApiService } from "@/common/service/api"
import { API_URL_BOOKABLE_UNIT } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

export async function getOneBookableUnit(id: number | undefined) {
  const apiService = new ApiService("mock")
  return await apiService.get(
    `${API_URL_BOOKABLE_UNIT}/bookable-unit-type/${id}`
  )
}

function useGetOneBookableUnit(id: number | undefined) {
  const query = useQuery({
    queryKey: ["bookable-unit", id],
    queryFn: () => getOneBookableUnit(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
  return query
}
export default useGetOneBookableUnit

import {
  API_URL_ACTIVITIES,
  API_URL_PROPERTIES,
  API_URL_RENTALS,
} from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useQuery } from "@tanstack/react-query"

type Props = { listingId: string; type: "property" | "rental" | "activity" }

export async function getFinishedSections({ listingId, type }: Props) {
  const apiService = new ApiService()
  const baseUrl = {
    property: API_URL_PROPERTIES,
    rental: API_URL_RENTALS,
    activity: API_URL_ACTIVITIES,
  }
  return await apiService.get(`${baseUrl[type]}/${listingId}/finished-sections`)
}

function useGetFinishedSections({ listingId, type = "property" }: Props) {
  const query = useQuery({
    queryKey: [`${type}-finished-sections`, listingId],
    queryFn: () => getFinishedSections({ listingId, type }),
    enabled: !!listingId,
  })
  return query
}
export default useGetFinishedSections

import { useQuery } from "@tanstack/react-query"
import {
  FilterService,
  T_Properties_Search,
} from "@repo/contract-2/search-filters"
import { FIFTEEN_MINUTES, TWELVE_MINUTES } from "@/common/constants"

const queryKey = FilterService.getQueryKeys().filterProperties

export async function getListings(searchQueries: T_Properties_Search) {
  const filter = new FilterService()
  return await filter.getPaginatedProperties({searchQueries})
}

function useGetListings(searchQueries: T_Properties_Search) {
  const query = useQuery({
    queryKey: [queryKey, searchQueries],
    refetchOnWindowFocus: false,
    queryFn: () => getListings(searchQueries),
    gcTime: FIFTEEN_MINUTES,
    staleTime: TWELVE_MINUTES,
  })
  return query
}

export default useGetListings
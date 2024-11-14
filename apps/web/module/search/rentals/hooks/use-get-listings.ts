import { useQuery } from "@tanstack/react-query"
import {
  FilterService,
  T_Rentals_Search,
} from "@repo/contract-2/search-filters"
import { E_Listing_Category } from "@repo/contract"
import { FIFTEEN_MINUTES, TWELVE_MINUTES } from "@/common/constants"

const queryKey = FilterService.getQueryKeys().filterRentals

export async function getPropertyListings(searchQueries: T_Rentals_Search) {
  const filter = new FilterService()
  return await filter.getPaginatedListings({
    category: E_Listing_Category.Rental,
    searchQueries,
  })
}

function useGetListings(searchQueries: T_Rentals_Search) {
  const query = useQuery({
    queryKey: [queryKey, searchQueries],
    refetchOnWindowFocus: false,
    queryFn: () => getPropertyListings(searchQueries),
    gcTime: FIFTEEN_MINUTES,
    staleTime: TWELVE_MINUTES,
  })
  return query
}

export default useGetListings

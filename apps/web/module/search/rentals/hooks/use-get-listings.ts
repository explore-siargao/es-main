import { useQuery } from "@tanstack/react-query"
import { FilterService, T_Rentals_Search } from "@repo/contract-2/search-filters"
import { E_Listing_Category } from "@repo/contract"

export async function getPropertyListings(searchQueries: T_Rentals_Search) {
  const filter = new FilterService();
  return await filter.getPaginatedListings({
    category: E_Listing_Category.Rental,
    searchQueries,
  });
}

function useGetListings(searchQueries: T_Rentals_Search) {
  const query = useQuery({
    queryKey: ["filter-rentals"],
    refetchOnWindowFocus: false,
    queryFn: () =>
      getPropertyListings(searchQueries),
  })
  return query
}

export default useGetListings

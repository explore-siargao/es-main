import { useQuery } from "@tanstack/react-query"
import { FilterService, T_Properties_Search } from "@repo/contract-2/search-filters"
import { E_Listing_Category } from "@repo/contract"

export async function getPropertyListings(searchQueries: T_Properties_Search) {
  const filter = new FilterService();
  return await filter.getPaginatedListings({
    category: E_Listing_Category.Property,
    searchQueries,
  });
}

function useGetListings(searchQueries: T_Properties_Search) {
  const query = useQuery({
    queryKey: ["filter-properties"],
    refetchOnWindowFocus: false,
    queryFn: () =>
      getPropertyListings(searchQueries),
  })
  return query
}

export default useGetListings

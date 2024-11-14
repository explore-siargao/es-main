import { useQuery } from "@tanstack/react-query"
import { FilterService, T_Activities_Search } from "@repo/contract-2/search-filters"
import { E_Listing_Category } from "@repo/contract"

export async function getPropertyListings(searchQueries: T_Activities_Search) {
  const filter = new FilterService();
  return await filter.getPaginatedListings({
    category: E_Listing_Category.Activity,
    searchQueries,
  });
}

function useGetListings(searchQueries: T_Activities_Search) {
  const query = useQuery({
    queryKey: ["filter-activities"],
    refetchOnWindowFocus: false,
    queryFn: () =>
      getPropertyListings(searchQueries),
  })
  return query
}

export default useGetListings

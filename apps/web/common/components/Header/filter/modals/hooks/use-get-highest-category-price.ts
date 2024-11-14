import { FIFTEEN_MINUTES, TWELVE_MINUTES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"
import { E_Listing_Category } from "@repo/contract"
import { FilterService } from "@repo/contract-2/search-filters"

const queryKeys = FilterService.getQueryKeys()

export async function getHighestPrice(category: E_Listing_Category) {
  const filter = new FilterService()
  return await filter.getCategoryHighestPrice({ category })
}

function useGetHighestCategoryPrice(category: E_Listing_Category) {
  const mapQueryKey = {
    [E_Listing_Category.Activity]: queryKeys.activitiesHighestPrice,
    [E_Listing_Category.Property]: queryKeys.propertiesHighestPrice,
    [E_Listing_Category.Rental]: queryKeys.rentalsHighestPrice,
  }
  const query = useQuery({
    queryKey: [mapQueryKey[category]],
    queryFn: () => getHighestPrice(category),
    gcTime: FIFTEEN_MINUTES,
    staleTime: TWELVE_MINUTES,
  })
  return query
  // SETUP CURRENCY OF 7 THAT JAKE SAID
}

export default useGetHighestCategoryPrice

import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"
import { T_Filter_Property } from "../reducer/property-reducer"

export async function getFilteredProperty(
  searchParams: T_Filter_Property | undefined
) {
  const apiService = new ApiService()
  return await apiService.get(`${API_URL_PROPERTIES}?propertyType=${searchParams?.propertyType}
    &priceFrom=${searchParams?.priceRange[0]}&priceTo=${searchParams?.priceRange[1]}&bedroomCount=${searchParams?.bedroomCount}
    &bedCount=${searchParams?.bedCount}&bathroomCount=${searchParams?.bathroomCount}&facilities=${searchParams?.facilities}
    &amenities=${searchParams?.amenities}&starRating=${searchParams?.starRating}`)
}

function useGetFilteredProperty(searchParams: T_Filter_Property | undefined) {
  const query = useQuery({
    queryKey: ["filtered-property"],
    queryFn: () => getFilteredProperty(searchParams),
    enabled: !!searchParams,
  })
  return query
}
export default useGetFilteredProperty

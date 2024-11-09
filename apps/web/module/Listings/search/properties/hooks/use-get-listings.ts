import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useQuery } from "@tanstack/react-query"

const normalizeParam = (param: string | null): string => {
  return param ? param : "any"
}

export async function getPropertyListings(
  location: string | null,
  type: string | null,
  facilities: string | null,
  amenities: string | null,
  priceFrom: string | null,
  priceTo: string | null,
  beds: string | null,
  bathrooms: string | null,
  bedrooms: string | null,
  starRating: string | null
) {
  const apiService = new ApiService()
  return await apiService.get(
    `${API_URL_PROPERTIES}/filtered?` +
      `location=${normalizeParam(location)}` +
      `&type=${normalizeParam(type)}` +
      `&facilities=${normalizeParam(facilities)}` +
      `&amenities=${normalizeParam(amenities)}` +
      `&priceFrom=${normalizeParam(priceFrom)}` +
      `&priceTo=${normalizeParam(priceTo)}` +
      `&beds=${normalizeParam(beds)}` +
      `&bathrooms=${normalizeParam(bathrooms)}` +
      `&bedrooms=${normalizeParam(bedrooms)}` +
      `&stars=${normalizeParam(starRating)}`
  )
}

function useGetListings(
  location: string | null,
  type: string | null,
  facilities: string | null,
  amenities: string | null,
  priceFrom: string | null,
  priceTo: string | null,
  beds: string | null,
  bathrooms: string | null,
  bedrooms: string | null,
  starRating: string | null
) {
  const query = useQuery({
    queryKey: ["filter-properties"],
    refetchOnWindowFocus: false,
    queryFn: () =>
      getPropertyListings(
        location,
        type,
        facilities,
        amenities,
        priceFrom,
        priceTo,
        beds,
        bathrooms,
        bedrooms,
        starRating
      ),
  })
  return query
}

export default useGetListings

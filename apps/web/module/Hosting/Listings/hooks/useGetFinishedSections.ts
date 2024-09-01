import {
  API_URL_ACTIVITIES,
  API_URL_PROPERTIES,
  API_URL_RENTALS,
} from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { E_Listing_Category } from "@repo/contract";
import { useQuery } from "@tanstack/react-query"

type Props = { listingId: string; category: E_Listing_Category }

export async function getFinishedSections({ listingId, category }: Props) {
  const apiService = new ApiService()
  const baseUrl = {
    [E_Listing_Category.Property]: API_URL_PROPERTIES,
    [E_Listing_Category.Rental]: API_URL_RENTALS,
    [E_Listing_Category.Activity]: API_URL_ACTIVITIES,
  }
  return await apiService.get(`${baseUrl[category]}/${listingId}/finished-sections`)
}

function useGetFinishedSections({ listingId, category = E_Listing_Category.Property }: Props) {
  const query = useQuery({
    queryKey: [`${category.toLocaleLowerCase()}-finished-sections`, listingId],
    queryFn: () => getFinishedSections({ listingId, category }),
    enabled: !!listingId,
  })
  return query
}
export default useGetFinishedSections

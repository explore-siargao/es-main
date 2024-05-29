import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

interface Amenity {
  amenities: [
    {
      id: number
      category: string
      amenity: string
      propertyId: number | null
      bookableUnitTypeId: number | null
    },
  ]
}

export async function addAmenitiesByBookableUnitTypeId(
  bookableUnitTypeId: number | undefined,
  props: Amenity
) {
  const apiService = new ApiService("mock")
  return await apiService.post(
    `${API_URL_PROPERTIES}/${bookableUnitTypeId}/amenities-bookableUnitType`,
    props
  )
}

function useAddAmenitiesByBookableUnitTypeId(
  bookableUnitTypeId: number | undefined
) {
  const query = useMutation({
    mutationFn: (props: Amenity) =>
      addAmenitiesByBookableUnitTypeId(bookableUnitTypeId, props),
  })
  return query
}
export default useAddAmenitiesByBookableUnitTypeId

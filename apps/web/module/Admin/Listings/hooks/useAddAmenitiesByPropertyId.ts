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

export async function addAmenitiesByPropertyId(
  propertyId: number | undefined,
  props: Amenity
) {
  const apiService = new ApiService("mock")
  return await apiService.post(
    `${API_URL_PROPERTIES}/${propertyId}/amenities-property`,
    props
  )
}

function useAddAmenitiesByPropertyId(propertyId: number | undefined) {
  const query = useMutation({
    mutationFn: (props: Amenity) => addAmenitiesByPropertyId(propertyId, props),
  })
  return query
}
export default useAddAmenitiesByPropertyId

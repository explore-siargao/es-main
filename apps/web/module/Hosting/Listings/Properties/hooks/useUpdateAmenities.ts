import { ApiService } from "@/common/service/api"
import { API_URL_PROPERTIES } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_Property_Amenity } from "@repo/contract"

export async function updateAmenities(
  propertyId: string | undefined,
  bookableUnitId: string | undefined,
  props: { amenities: T_Property_Amenity[] }
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/${bookableUnitId}/amenities`,
    props
  )
}

function useUpdateAmenities(
  propertyId: string | undefined,
  bookableUnitId: string | undefined
) {
  const query = useMutation({
    mutationFn: (props: { amenities: T_Property_Amenity[] }) =>
      updateAmenities(propertyId, bookableUnitId, props),
  })
  return query
}

export default useUpdateAmenities

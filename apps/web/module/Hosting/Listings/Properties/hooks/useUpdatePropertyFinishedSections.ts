import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

interface Section {
  finishedSections: string
}

export async function updatePropertyFinishedSections(
  propertyId: string | undefined,
  props: Section
) {
  const apiService = new ApiService("v2")
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/finished-sections`,
    props
  )
}

function useUpdatePropertyFinishedSections(propertyId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: Section) =>
      updatePropertyFinishedSections(propertyId, props),
  })
  return query
}

export default useUpdatePropertyFinishedSections

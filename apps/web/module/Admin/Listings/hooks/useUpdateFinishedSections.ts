import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

interface Section {
  finishedSections: string
}

export async function updateFinishedSections(
  propertyId: string | undefined,
  props: Section
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/finished-sections`,
    props
  )
}

function useUpdateActivityFinishedSections(propertyId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: Section) => updateFinishedSections(propertyId, props),
  })
  return query
}
export default useUpdateActivityFinishedSections

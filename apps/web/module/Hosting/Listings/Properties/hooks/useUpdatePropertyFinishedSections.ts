import { API_URL_PROPERTIES } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

type T_Finished_Sections = {
  newFinishedSection: string
}

export async function updatePropertyFinishedSections(
  propertyId: string | undefined,
  props: T_Finished_Sections
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_PROPERTIES}/${propertyId}/finished-sections`,
    props
  )
}

function useUpdatePropertyFinishedSection(propertyId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Finished_Sections) =>
      updatePropertyFinishedSections(propertyId, props),
  })
  return query
}

export default useUpdatePropertyFinishedSection

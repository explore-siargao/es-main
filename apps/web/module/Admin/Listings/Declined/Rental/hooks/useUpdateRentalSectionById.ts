import { ApiService } from "@/common/service/api"
import { API_URL_RENTALS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"

interface Section {
  section: string
}

export async function updateRentalSectionById(
  id: number | undefined,
  props: Section
) {
  const apiService = new ApiService("mock")
  return await apiService.patch(`${API_URL_RENTALS}/${id}/section`, props)
}

function useUpdateRentalSectionById(id: number | undefined) {
  const query = useMutation({
    mutationFn: (props: Section) => updateRentalSectionById(id, props),
  })
  return query
}

export default useUpdateRentalSectionById

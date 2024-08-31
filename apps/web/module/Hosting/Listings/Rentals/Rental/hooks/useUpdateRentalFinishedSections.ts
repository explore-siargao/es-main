import { API_URL_RENTALS } from "@/common/constants"
import { ApiService } from "@/common/service/api"
import { useMutation } from "@tanstack/react-query"

type T_Finished_Sections = {
  newFinishedSection: string
}

export async function updateRentalFinishedSections(
  rentalId: string | undefined,
  props: T_Finished_Sections
) {
  const apiService = new ApiService()
  return await apiService.patch(
    `${API_URL_RENTALS}/${rentalId}/finished-sections`,
    props
  )
}

function useUpdateRentalFinishedSections(rentalId: string | undefined) {
  const query = useMutation({
    mutationFn: (props: T_Finished_Sections) =>
      updateRentalFinishedSections(rentalId, props),
  })
  return query
}

export default useUpdateRentalFinishedSections

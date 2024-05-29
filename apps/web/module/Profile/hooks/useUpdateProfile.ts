import { ApiService } from "@/common/service/api"
import { API_URL_USERS } from "@/common/constants"
import { useMutation } from "@tanstack/react-query"
import { T_ProfileEditStore } from "../Setup/store/useProfileEditStore"

interface ProfileProps {
  imageKey?: string
  school?: string
  work?: string
  live?: string
  language?: string
  born?: string
  favoriteSong?: string
  obsessedWith?: string
  funFact?: string
  uselessSkill?: string
  biography?: string
  spendTime?: string
  pets?: string
  aboutMe?: string
}
export async function updateProfile(props: T_ProfileEditStore) {
  const apiService = new ApiService()
  return await apiService.patch(`${API_URL_USERS}/profile`, props)
}

function useUpdateProfile() {
  const query = useMutation({
    mutationFn: (props: T_ProfileEditStore) => updateProfile(props),
  })
  return query
}
export default useUpdateProfile

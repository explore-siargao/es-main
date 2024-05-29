import { create } from "zustand"
import { E_UserRole, T_Session } from "@repo/contract"

type T_Session_Action = {
  update: (session: T_Session) => void
  remove: () => void
}

const useSessionStore = create<T_Session & T_Session_Action>((set) => ({
  isHost: false,
  id: null,
  email: null,
  profilePicture: null,
  registrationType: null,
  deactivated: null,
  changePasswordAt: null,
  canReceiveEmail: false,
  role: E_UserRole.User,
  personalInfo: null,
  update: (session: T_Session) => set(() => ({ ...session })),
  remove: () =>
    set({
      isHost: false,
      id: null,
      email: null,
      profilePicture: null,
      registrationType: null,
      deactivated: null,
      changePasswordAt: null,
      canReceiveEmail: false,
      role: E_UserRole.User,
      personalInfo: null,
    }),
}))

export default useSessionStore
